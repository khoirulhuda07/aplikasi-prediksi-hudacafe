<?php

namespace App\Http\Controllers;
use App\Models\produk;
use App\Models\dataset;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\String_;

class datasetcontroller extends Controller
{
    //
    public function index(){
        $dataset = dataset::all();
        $produk = produk::all();
        return view('user.dataset', compact('dataset','produk'));
    }
    public function update(Request $request, String $id){
        $request->validate([
            'produk' => 'required',
            'bulan' => 'required',
            'jumlah' => 'required|integer|min:1',
        ],
    [
        'produk.required' => 'Produk wajib dipilih.',
        'bulan.required' => 'Bulan wajib diisi.',
        'jumlah.required' => 'Jumlah wajib diisi.',
        'jumlah.integer' => 'Jumlah harus berupa angka.',
        'jumlah.min' => 'Jumlah minimal harus 1.',
    ]);
        $dataset = dataset::where('ID_PENJUALAN', $id)->first();
        $dataset->ID_PRODUK = $request->produk;
        $bulan = $request->bulan. '-01';
        $dataset->BULAN = $bulan;
        $dataset->JUMLAH = $request->jumlah;
        $dataset->save();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
    public function insert(Request $request){
        $request->validate([
            'produk' => 'required',
            'bulan' => 'required',
            'jumlah' => 'required|integer|min:1',
        ],
    [
        'produk.required' => 'Produk wajib dipilih.',
        'bulan.required' => 'Bulan wajib diisi.',
        'jumlah.required' => 'Jumlah wajib diisi.',
        'jumlah.integer' => 'Jumlah harus berupa angka.',
        'jumlah.min' => 'Jumlah minimal harus 1.',
    ]);
    $bulan = $request->bulan. '-01';
        $dataset = new dataset;
        $dataset->ID_PRODUK = $request->produk;
        $dataset->BULAN = $bulan;
        $dataset->JUMLAH = $request->jumlah;
        $dataset->save();
        return redirect()->back()->with('success', 'Data berhasil ditambahkan');
    }
    public function delete(String $id){
        $dataset = dataset::where('ID_PENJUALAN', $id)->first();
        $dataset->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
