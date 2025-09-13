@extends('user.template.appuser')
@section('content')
@section('title', 'Halaman Form Prediksi')
<style>


    /* From Uiverse.io by Praashoo7 */ 
.form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 2.5em;
  border-radius: 25px;
  -webkit-transition: .1s ease-in-out;
  transition: .1s ease-in-out;
  -webkit-box-shadow: rgba(0, 0, 0, 0.4) 1px 2px 2px;
          box-shadow: rgba(0, 0, 0, 0.4) 1px 2px 2px;
}

.form:hover{
  -webkit-transform: translateX(-0.5em) translateY(-0.5em);
      -ms-transform: translateX(-0.5em) translateY(-0.5em);
          transform: translateX(-0.5em) translateY(-0.5em);
  border: 1px solid #171717;
  -webkit-box-shadow:  10px 10px 0px #666666;
          box-shadow:  10px 10px 0px #666666;
}

.heading{
  color: black;
  padding-bottom: 2em;
  text-align: center;
  font-weight: bold;
}

.input{
  border-radius: 5px;
  border: 1px solid whitesmoke;
  background-color: whitesmoke;
  outline: none;
  padding: 0.7em;
  -webkit-transition: .2s ease-in-out;
  transition: .2s ease-in-out;
}

.input:hover{
  -webkit-box-shadow: 6px 6px 0px #969696,
             -3px -3px 10px #ffffff;
          box-shadow: 6px 6px 0px #969696,
             -3px -3px 10px #ffffff;
}

.input:focus{
  background: #ffffff;
  -webkit-box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
          box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
}

.form .btn {
  margin-top: 2em;
  -ms-flex-item-align: center;
      align-self: center;
  padding: 0.7em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 10px;
  border: 1px solid black;
  color: black;
  -webkit-transition: .1s ease-in-out;
  transition: .1s ease-in-out;
  -webkit-box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
          box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
}

.form .btn:hover{
  -webkit-box-shadow: 6px 6px 0px #969696,
             -3px -3px 10px #ffffff;
          box-shadow: 6px 6px 0px #969696,
             -3px -3px 10px #ffffff;
  -webkit-transform: translateX(-0.5em) translateY(-0.5em);
      -ms-transform: translateX(-0.5em) translateY(-0.5em);
          transform: translateX(-0.5em) translateY(-0.5em);
}

.form .btn:active{
  -webkit-transition: .1s;
  transition: .1s;
  -webkit-transform: translateX(0em) translateY(0em);
      -ms-transform: translateX(0em) translateY(0em);
          transform: translateX(0em) translateY(0em);
  -webkit-box-shadow: none;
          box-shadow: none;
}
label {
  font-weight: 600;
  margin-top: 10px;
}

</style>
<div class="row">
<div class="col-12 col-md-6 mx-auto">
<form class="form" method="POST" action="{{url('/hasil')}}" enctype="multipart/form-data">
@csrf
    <p class="heading">Form Prediksi</p>

    <label for="kategori">Pilih Kategori Produk</label>
    <select class="input" name="kategori" id="kategori">
        <option value="">Pilih Kategori Produk</option>
      @foreach($produk as $p)
      <option value="{{$p->ID_PRODUK}}">{{$p->NAMA_PRODUK}}</option>
      @endforeach
    </select>

    <label for="bulan">Pilih Bulan</label>
    <input type="month" class="input" id="bulan" name="bulan" placeholder="Masukkan Bulan"> 

    <label for="nilaik">Masukkan Nilai K</label>
    <input type="number" class="input" id="nilaik" name="nilaik" min='1' max='5' placeholder="Masukkan Nilai K maksimal = 5 "> 

    <button type="submit" class="btn">Prediksi</button>
</form>

</div>
</div>
@endsection