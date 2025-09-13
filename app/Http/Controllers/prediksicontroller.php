<?php

namespace App\Http\Controllers;
use App\Models\dataset;
use App\Models\produk;
use Illuminate\Http\Request;
use Carbon\Carbon;

class prediksicontroller extends Controller
{
    //
    public function index (){
        $produk = produk::all();
        return view('user.prediksi',compact('produk'));
    }
    public function insert(Request $request)
{
    $request->validate([
        'kategori' => 'required|in:1,2,3',
        'bulan' => 'required|date_format:Y-m',
        'nilaik' => 'required|integer|min:1',
    ], [
        'kategori.required' => 'Kategori produk harus dipilih.',
        'kategori.in' => 'Kategori produk tidak valid.',
        'bulan.required' => 'Bulan harus diisi.',
        'bulan.date_format' => 'Format bulan tidak valid.',
        'nilaik.required' => 'Nilai K harus diisi.',
        'nilaik.integer' => 'Nilai K harus berupa angka.',
        'nilaik.min' => 'Nilai K minimal adalah 1.',
    ]);

    $kategori = $request->kategori;
    $bulanInput = $request->bulan; // contoh: "2025-01"
    $nilaiK = $request->nilaik;

    // Parsing ke tanggal awal bulan
    $carbonBulan = Carbon::createFromFormat('Y-m', $bulanInput)->startOfMonth();

    // Simpan ke database sebagai date: "2025-01-01"
    $bulanUntukDB = $carbonBulan->toDateString(); // kalau nanti perlu insert/update ke DB

    $bulanUji = (int) $carbonBulan->format('m');
    $tahunUji = $carbonBulan->format('Y');

    $dataset = dataset::where('ID_PRODUK', $kategori)->get();

    if ($dataset->whereNull('BULAN')->isNotEmpty()) {
        return redirect()->back()->with('error', 'Terdapat data kosong pada kolom BULAN. Perbaiki data sebelum melanjutkan.');
    }

    $meanJumlah = round($dataset->whereNotNull('JUMLAH')->avg('JUMLAH'));

    $dataset = $dataset->map(function ($data) use ($meanJumlah) {
        if (is_null($data->JUMLAH)) {
            $data->JUMLAH = $meanJumlah;
        }
        return $data;
    });

    if ($dataset->isEmpty()) {
        return redirect()->back()->with('error', 'Dataset tidak valid atau tidak ada data untuk diproses.');
    }

    $jarak = [];
    $bulanMapping = [
        1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
        5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
        9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
    ];
    $kategoriMapping = [1 => 'kopi hitam', 2 => 'kopi susu', 3 => 'Good Day'];
    $produk = produk::where('ID_PRODUK', $kategori)->value('NAMA_PRODUK');
    $bulan = $bulanMapping[$bulanUji] . ' ' . $tahunUji;

    foreach ($dataset as $data) {
        $bulanData = $data->BULAN; // DATE: format 'YYYY-MM-DD'
        $carbonData = Carbon::parse($bulanData)->startOfMonth();
        $distance = abs($carbonData->diffInMonths($carbonBulan));

        $jarak[] = [
            'bulan' => $carbonData->translatedFormat('F Y'), // tampilkan sebagai "Januari 2025"
            'nilai' => $data->JUMLAH,
            'jarak' => $distance,
        ];
    }

    usort($jarak, fn($a, $b) => $a['jarak'] <=> $b['jarak']);

    $tetanggaTerdekat = array_slice($jarak, 0, $nilaiK);
    $nilaiY = array_column($tetanggaTerdekat, 'nilai');
    $nilaiYStr = implode(' + ', $nilaiY);
    $prediksi = array_sum($nilaiY) / $nilaiK;
    $prediksi1 = round($prediksi,4);
    $prediksiBulat = round($prediksi);

    $rumusLatex = "\\( Y_{\\text{prediksi}} = \\frac{1}{{$nilaiK}} ({$nilaiYStr}) = {$prediksi1} \\)";

    return view('user.hasil', compact(
        'jarak',
        'produk',
        'bulan',
        'nilaiK',
        'prediksiBulat',
        'tetanggaTerdekat',
        'rumusLatex'
    ));
}
    
    
    
    public function ubahK(Request $request){
        $request->validate([
            'nilaik'=> 'required|integer|min:1'
        ]);

        $nilaiK = $request->nilaik;
        return $this->hitungAkurasi($nilaiK);

        
    }

    public function hitungAkurasi($nilaiK = 2)
    {
        $kategoriMapping = produk::all();
    
        $bulanMapping = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
    
        $hasilAkurasiPerProduk = [];
        $totalAkurasiSemuaProduk = 0;
    
        foreach ($kategoriMapping as $kategori) {
            $dataset = dataset::where('ID_PRODUK', $kategori->ID_PRODUK)->get();
            $namaProduk = $kategori->NAMA_PRODUK;
    
            $hasilAkurasi = [];
    
            foreach ($dataset as $dataUji) {
                $tanggalUji = Carbon::parse($dataUji->BULAN);
                $nilaiAktual = $dataUji->JUMLAH;
    
                $jarak = [];
    
                foreach ($dataset as $data) {
                    $tanggalData = Carbon::parse($data->BULAN);
                    $distance = abs($tanggalData->diffInMonths($tanggalUji));
    
                    $jarak[] = [
                        'bulan' => $bulanMapping[(int)$tanggalData->format('m')] . ' ' . $tanggalData->format('Y'),
                        'nilai' => $data->JUMLAH,
                        'jarak' => $distance,
                    ];
                }
    
                usort($jarak, function ($a, $b) {
                    return $a['jarak'] <=> $b['jarak'];
                });
    
                $tetanggaTerdekat = array_slice($jarak, 0, $nilaiK);
    
                $prediksi = array_sum(array_column($tetanggaTerdekat, 'nilai')) / $nilaiK;
    
                $kesalahan = abs(($nilaiAktual - $prediksi) / $nilaiAktual);
    
                $hasilAkurasi[] = [
                    'bulan' => $bulanMapping[(int)$tanggalUji->format('m')] . ' ' . $tanggalUji->format('Y'),
                    'nilai_aktual' => $nilaiAktual,
                    'prediksi' => round($prediksi, 4),
                    'kesalahan' => $kesalahan,
                ];
            }
    
            $akurasiTotal = array_sum(array_map(function ($item) {
                return $item['kesalahan'] * 100;
            }, $hasilAkurasi)) / count($hasilAkurasi);

        
            // $akurasiTotal = 100 - $mape;
            // Tambahkan ke total untuk dihitung rata-ratanya nanti
            $totalAkurasiSemuaProduk += $akurasiTotal;
    
            $hasilAkurasiPerProduk[] = [
                'nama_produk' => $namaProduk,
                'hasil_akurasi' => $hasilAkurasi,
                'akurasi_total' => round($akurasiTotal, 2) . ' %'
            ];
        }
    
        // Hitung rata-rata dari semua akurasi produk
        $rataRataAkurasiSemuaProduk = round($totalAkurasiSemuaProduk / count($kategoriMapping), 2);
    
        return view('user.akurasi', compact('hasilAkurasiPerProduk', 'nilaiK', 'rataRataAkurasiSemuaProduk'));
    }
    
    
    
}
