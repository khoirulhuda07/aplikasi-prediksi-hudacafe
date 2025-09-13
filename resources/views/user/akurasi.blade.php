@extends('user.template.appuser')
@section('content')
@section('title', 'Halaman Akurasi')

<!-- Tambahkan CDN DataTables -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Evaluasi (MAPE) Prediksi dengan Metode KNN Dengan Jarak Manhattan dengan nilai K = {{$nilaiK}}</h4>
                <!-- Tombol untuk membuka modal -->
                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#ubahKModal">Ubah Nilai K</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    @if(!empty($hasilAkurasiPerProduk))
                        @foreach($hasilAkurasiPerProduk as $index => $hasilProduk)
                            <h2>Produk: {{ ucfirst($hasilProduk['nama_produk'] ?? 'Tidak Diketahui') }}</h2>
                            <table id="datatable-{{ $index }}" class="display table table-striped table-hover datatable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Bulan</th>
                                        <th>Riwayat Penjualan</th>
                                        <th>Prediksi</th>
                                        <th>Kesalahan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($hasilProduk['hasil_akurasi'] as $hasil)
                                        <tr>
                                            <td>{{ $loop->iteration }}</td>
                                            <td>{{ $hasil['bulan'] }}</td>
                                            <td>{{ $hasil['nilai_aktual'] }}</td>
                                            <td>{{ $hasil['prediksi'] }}</td>
                                            <td>{{ number_format($hasil['kesalahan'],4) }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4" style="text-align: right;"><strong>Total MAPE :</strong></td>
                                        <td><strong>{{ $hasilProduk['akurasi_total'] }}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <br>
                        @endforeach
                        <div class="alert alert-info mt-4" role="alert">
    <h5 class="mb-0">Total MAPE Semua Kategori Produk: <strong>{{ $rataRataAkurasiSemuaProduk }}%</strong></h5>
</div>
                    @else
                        <p>Tidak ada data akurasi untuk ditampilkan.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal untuk mengubah nilai K -->
<div class="modal fade" id="ubahKModal" tabindex="-1" aria-labelledby="ubahKModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{url('/ubahk')}}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="modal-header">
                    <h5 class="modal-title" id="ubahKModalLabel">Ubah Nilai K</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nilaiK">Masukkan Nilai K</label>
                        <input type="number" name="nilaik" id="nilaiK" class="form-control" min="1" >
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-primary">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Inisialisasi DataTables -->
<script>
    $(document).ready(function() {
        $('.datatable').each(function () {
            $(this).DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/id.json"
                }
            });
        });
    });
</script>
@endsection
