<?php

use App\Http\Controllers\akunController;
use App\Http\Controllers\dashboardcontroller;
use App\Http\Controllers\datasetcontroller;
use App\Http\Controllers\prediksicontroller;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware(['auth'])->group(function(){
    Route::get('/', [dashboardcontroller::class, 'index']);
    Route::get('/data', [datasetcontroller::class, 'index']);
    Route::get('/prediksi',[prediksicontroller::class,'index']);
    Route::post('/hasil', [prediksicontroller::class, 'insert']);
    Route::get('/akurasi', [prediksicontroller::class, 'hitungAkurasi']);
    Route::post('/ubahk', [prediksicontroller::class, 'ubahK']);
    Route::post('dataset/update/{id}', [datasetcontroller::class, 'update']);
    Route::post('dataset/tambah', [datasetcontroller::class, 'insert']);
    Route::delete('dataset/delete/{id}', [datasetcontroller::class, 'delete']);
    Route::get('/akun',[akunController::class,'index']);
    Route::post('/akun/tambah',[akunController::class,'tambah']);
    Route::delete('/akun/hapus/{id}',[akunController::class,'hapus']);
});
Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
