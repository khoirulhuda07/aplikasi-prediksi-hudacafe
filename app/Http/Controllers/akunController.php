<?php

namespace App\Http\Controllers;
use App\Models\users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class akunController extends Controller
{
    //
    public function index()
    {
        $user = Users::where('level','user')->get();
        return view('user.akun', compact('user'));
    }
    public function tambah(Request $request)
    {
        $user = new users;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->pw);
        $user->save();
        return redirect()->back()->with('success','data akun berhasil ditambah');
    }
    public function hapus(String $id)
    {
        $user = users::find($id);
        $user->delete();
        return redirect()->back()->with('success','data akun berhasil dihapus');
    }
}
