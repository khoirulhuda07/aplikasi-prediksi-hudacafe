@extends('user.template.appuser')
@section('content')
@section('title', 'Halaman Data Akun')
<div class="row">
<div class="col-md-12">
                <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Data Akun</h4>
                    <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#tambah">Tambah <i class="fa fa-plus" aria-hidden="true"></i></button>
                  </div>
                  <div class="card-body">
                  <div class="table-responsive">
                    <table class="display table table-striped table-hover">
                        <thead>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Aksi</th>
                        </thead>
                        <tbody>
                            @foreach($user as $s)
                            <tr>
                              <td>{{$loop->iteration}}</td>
                              <td>{{$s->name}}</td>
                              <td>{{$s->email}}</td>
                              <td>
                              <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#editModal{{ $s->id }}">
                              <i class="fa fa-trash" aria-hidden="true"></i>
</button>
                              </td>
                            </tr>
                            <div class="modal fade" id="editModal{{ $s->id }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Hapus Penjualan</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form method="POST" action="{{url('akun/hapus/'.$s->id)}}" enctype="multipart/form-data">
          @csrf
          @method('DELETE')
          <div class="row">
            <div class="col-12">
              <p>apakah anda yakin ingin menghapus akun ini ?</p>
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
                            @endforeach
                        </tbody>

                    </table>
                  </div>
                  </div>
                </div>
              </div>
              </div>


              <div class="modal fade" id="tambah" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form action="{{url('akun/tambah')}}" method="POST" enctype="multipart/form-data">
      @csrf
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Form Tambah Akun</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
        <div class="col-12">
          <div class="form-floating mb-3">
                <input type="text" class="form-control" id="jumlahInput" name="name" placeholder="Total Penjualan">
                <label for="jumlahInput">Username</label>
              </div>
        </div>
        <div class="col-12">
          <div class="form-floating mb-3">
                <input type="email" class="form-control" id="jumlahInput" name="email" placeholder="Total Penjualan">
                <label for="jumlahInput">Email</label>
              </div>
        </div>
          <div class="col-12">
          <div class="form-floating mb-3">
                <input type="text" class="form-control" id="jumlahInput" name="pw" placeholder="Total Penjualan">
                <label for="jumlahInput">Password</label>
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