@extends('user.template.appuser')
@section('content')
@section('title', 'Halaman Dataset')
@php
use Carbon\Carbon;
Carbon::setLocale('id');
@endphp
<div class="row">
<div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Riwayat Penjualan</h4>
                    <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#tambah">Tambah <i class="fa fa-plus" aria-hidden="true"></i></button>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table
                        id="basic-datatables"
                        class="display table table-striped table-hover"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Bulan</th>
                            <th>Total Penjualan</th>
                            @if(Auth::user()->level == 'admin')
                            <th>Aksi</th>
                            @else
                            @endif
                          </tr>
                        </thead>
                       
                       <tbody>
                        @foreach ($dataset as $d)
                      
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $d->produk->NAMA_PRODUK }}</td>
                            <td>{{\Carbon\Carbon::parse($d->BULAN)->translatedFormat('F Y') }}</td>
                            <td>{{ $d->JUMLAH }} Pcs</td>
                            @if(Auth::user()->level == 'admin')
                            <td>
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal{{ $d->ID_PENJUALAN }}">
                            <i class="fas fa-edit"></i>
</button>     <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#hapusModal{{ $d->ID_PENJUALAN }}">
<i class="fa fa-trash" aria-hidden="true"></i>
</button>
                            </td>
                            @else
                            @endif
                            <div class="modal fade" id="editModal{{ $d->ID_PENJUALAN }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Penjualan</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form method="POST" action="{{url('dataset/update/'.$d->ID_PENJUALAN)}}" enctype="multipart/form-data">
          @csrf
          <div class="row">
            <div class="col-12">
            <div class="form-floating mb-3">
            <select class="form-control" id="produkSelect" name="produk">
  @foreach($produk as $p)
    <option value="{{ $p->ID_PRODUK }}" {{ $d->ID_PRODUK == $p->ID_PRODUK ? 'selected' : '' }}>
      {{ $p->NAMA_PRODUK }}
    </option>
  @endforeach
</select>
  <label for="produkSelect">Nama Produk</label>
</div>
<div class="form-floating mb-3">
                <input type="month" class="form-control" id="jumlahInput" value="{{ \Carbon\Carbon::parse($d->BULAN)->format('Y-m') }}" name="bulan" placeholder="Total Penjualan">
                <label for="jumlahInput">Total Penjualan</label>
              </div>
              <div class="form-floating mb-3">
                <input type="number" class="form-control" id="jumlahInput" value="{{ $d->JUMLAH }}" name="jumlah" placeholder="Total Penjualan">
                <label for="jumlahInput">Total Penjualan</label>
              </div>
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
</div>
<div class="modal fade" id="hapusModal{{ $d->ID_PENJUALAN }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Hapus Penjualan</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form method="POST" action="{{url('dataset/delete/'.$d->ID_PENJUALAN)}}" enctype="multipart/form-data">
          @csrf
          @method('DELETE')
          <div class="row">
            <div class="col-12">
              <p>apakah anda yakin ingin menghapus data ini ?</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-danger">hapus</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
                        </tr>
                        @endforeach
                       </tbody>
                       
                      </table>
                    </div>
                  </div>
                </div>
              </div>

</div>
<!-- Modal -->
<div class="modal fade" id="tambah" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form action="{{url('dataset/tambah')}}" method="POST" enctype="multipart/form-data">
      @csrf
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Form Tambah Riwaya Penjualan</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-12">
            <div class="form-floating mb-3">
              <select class="form-control" id="produkSelect" name="produk">
               @foreach($produk as $p)
               <option value="{{$p->ID_PRODUK}}">{{$p->NAMA_PRODUK}}</option>
               @endforeach
              </select>
              <label for="produkSelect">Nama Produk</label>
            </div>
          </div>
          <div class="col-12">
          <div class="form-floating mb-3">
                <input type="month" class="form-control" id="jumlahInput" name="bulan" placeholder="Total Penjualan">
                <label for="jumlahInput">Bulan</label>
              </div>
        </div>
          <div class="col-12">
          <div class="form-floating mb-3">
                <input type="number" class="form-control" id="jumlahInput" name="jumlah" placeholder="Total Penjualan">
                <label for="jumlahInput">Total Penjualan</label>
              </div>
        </div>
        </div>
      </div>
      <div class="modal-footer">
        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
        <button type="submit" class="btn btn-primary">Simpan</button>
      </div>
      </form>
    </div>
  </div>
</div>

@endsection
