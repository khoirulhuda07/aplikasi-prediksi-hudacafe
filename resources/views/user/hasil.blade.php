@extends('user.template.appuser')
@section('content')
@section('title', 'Halaman Hasil Prediksi')
@php
use Carbon\Carbon;
Carbon::setLocale('id');
@endphp
<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>
<script>
  window.MathJax = {
    tex: {
      inlineMath: [['\\(', '\\)']],
      displayMath: [['$$','$$']]
    }
  };
</script>
<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">
        @if(session('error'))
    <div class="alert alert-danger">
        {{ session('error') }}
    </div>
@endif
          Hasil dari perhitungan dengan memprediksi bulan {{ $bulan }} mendatang pada produk {{ $produk }} 
          dengan nilai K = {{ $nilaiK }}. Hasil prediksi: {{ $prediksiBulat }} Pcs
        </h4>
        <h5 > <p>Jarak antar data dihitung dengan rumus \( d = |x - y| \).</p></h5>
        <div>
        <p><strong>Keterangan:</strong></p>
    <ul >
        <li><strong>x</strong> = nilai numerik dari bulan pada data <em>training</em>.</li>
        <li><strong>y</strong> = nilai numerik dari bulan pada data <em>uji</em>.</li>
    </ul>
        </div>
      
      </div>
      <div class="card-body">
        <div class="row">
          <!-- Tabel Semua Perhitungan Jarak -->
          <div class="col-12 col-md-6">
            <div class="card">
              <div class="card-body">
             
                <h5>1. Semua Perhitungan Jarak</h5>
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Bulan</th>
                        <th>Total Penjualan</th>
                        <th>Jarak Antar Bulan ke Bulan {{ $bulan }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @foreach ($jarak as $d)
                        <tr>
                          <td>{{ $loop->iteration }}</td>
                          <td>{{\Carbon\Carbon::parse($d['bulan'])->translatedFormat('F Y') }}</td>
                          <td>{{ $d['nilai'] }}</td>
                          <td>{{ $d['jarak'] }}</td>
                        </tr>
                      @endforeach
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabel Tetangga Terdekat -->
          <div class="col-12 col-md-6">
            <div class="card">
              <div class="card-body">
                <h5>2. Tetangga Terdekat (K = {{ $nilaiK }})</h5>
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Bulan</th>
                        <th>Total Penjualan</th>
                        <th>Jarak Antar Bulan ke Bulan {{ $bulan }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @foreach ($tetanggaTerdekat as $t)
                        <tr>
                          <td>{{ $loop->iteration }}</td>
                          <td>{{ $t['bulan'] }}</td>
                          <td>{{ $t['nilai'] }}</td>
                          <td>{{ $t['jarak'] }}</td>
                        </tr>
                      @endforeach
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hasil Prediksi -->
        <div class="row mt-3">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5>3. Hasil Prediksi</h5>
                <p>
                  Berdasarkan perhitungan KNN dengan <strong>K = {{ $nilaiK }}</strong>, prediksi penjualan 
                  untuk bulan {{ $bulan }} adalah:
                </p>
                <div class="text-center" style="overflow-x: auto">
                    {!! $rumusLatex !!}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
@endsection
