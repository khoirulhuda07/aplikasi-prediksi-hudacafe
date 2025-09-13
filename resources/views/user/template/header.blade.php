<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>@yield('title')</title>
    <meta
      content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
      name="viewport"
    />
    <link
      rel="icon"
      href="assets/img/kaiadmin/favicon.ico"
      type="image/x-icon"
    />

    <!-- Fonts and icons -->
    <script src="{{asset('user7/js/plugin/webfont/webfont.min.js')}}"></script>
    <script>
      WebFont.load({
        google: { families: ["Public Sans:300,400,500,600,700"] },
        custom: {
          families: [
            "Font Awesome 5 Solid",
            "Font Awesome 5 Regular",
            "Font Awesome 5 Brands",
            "simple-line-icons",
          ],
          urls: ["{{asset('user7/css/fonts.min.css')}}"],
        },
        active: function () {
          sessionStorage.fonts = true;
        },
      });
    </script>

    <!-- CSS Files -->
    <link rel="stylesheet" href="{{asset('user7/css/bootstrap.min.css')}}" />
    <link rel="stylesheet" href="{{asset('user7/css/plugins.min.css')}}" />
    <link rel="stylesheet" href="{{asset('user7/css/kaiadmin.min.css')}}" />

    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link rel="stylesheet" href="{{asset('user7/css/demo.css')}}" />
    <style>
      /* Efek transisi smooth saat dropdown terbuka */
.animated-dropdown {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
}

/* Ketika dropdown terbuka */


      input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Menghilangkan spinner di Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }
    </style>
  </head>
  <body>
  @include('sweetalert::alert')

    <div class="wrapper">
      <!-- Sidebar -->
      <div class="sidebar" data-background-color="dark">
        <div class="sidebar-logo">
          <!-- Logo Header -->
          <div class="logo-header" data-background-color="dark">
            <a href="#" class="logo">
             <p style="color: white; font-weight: bold; font-size: 20px"> HudaCafee</p>
            </a>
            <div class="nav-toggle">
              <button class="btn btn-toggle toggle-sidebar">
                <i class="gg-menu-right"></i>
              </button>
              <button class="btn btn-toggle sidenav-toggler">
                <i class="gg-menu-left"></i>
              </button>
            </div>
            <button class="topbar-toggler more">
              <i class="gg-more-vertical-alt"></i>
            </button>
          </div>
          <!-- End Logo Header -->
        </div>
        <div class="sidebar-wrapper scrollbar scrollbar-inner">
        <div class="sidebar-content">
    <ul class="nav nav-secondary">
        <li class="nav-item active">
            <a data-bs-toggle="collapse" href="#dashboard" class="collapsed" aria-expanded="false">
                <i class="fas fa-home"></i>
                <p>Menu Aplikasi</p>
                <span class="caret"></span>
            </a>
            <div class="collapse" id="dashboard" style="transition: all 0.3s linear;">
                <ul class="nav nav-collapse">
                   
                    @if(Auth::user()->level == 'user')
                    <li>
                        <a href="{{url('/data')}}">
                            <span class="sub-item">Data Penjualan</span>
                        </a>
                    </li>
                    @elseif(Auth::user()->level == 'admin')
                    <li>
                        <a href="{{url('/data')}}">
                            <span class="sub-item">Data Penjualan</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('/prediksi')}}">
                            <span class="sub-item">Prediksi</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('/akurasi')}}">
                            <span class="sub-item">Evaluasi</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{url('/akun')}}">
                            <span class="sub-item">Data Akun</span>
                        </a>
                    </li>
                    @endif
                </ul>
            </div>
            
        </li>
    </ul>
</div>

        </div>
      </div>
      <!-- End Sidebar -->

      <div class="main-panel">
        <div class="main-header">
          <div class="main-header-logo">
            <!-- Logo Header -->
            <div class="logo-header" data-background-color="dark">
              <a href="index.html" class="logo">
                <img
                  src="assets/img/kaiadmin/logo_light.svg"
                  alt="navbar brand"
                  class="navbar-brand"
                  height="20"
                />
              </a>
              <div class="nav-toggle">
                <button class="btn btn-toggle toggle-sidebar">
                  <i class="gg-menu-right"></i>
                </button>
                <button class="btn btn-toggle sidenav-toggler">
                  <i class="gg-menu-left"></i>
                </button>
              </div>
              <button class="topbar-toggler more">
                <i class="gg-more-vertical-alt"></i>
              </button>
            </div>
            <!-- End Logo Header -->
          </div>
          <!-- Navbar Header -->
          <nav
            class="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"
          >
            <div class="container-fluid">
              <nav
                class="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex"
              >
               
              </nav>

              <ul class="navbar-nav topbar-nav ms-md-auto align-items-center">
                <li
                  class="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none"
                >
                  <a
                    class="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <i class="fa fa-search"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-search animated fadeIn">
                    <form class="navbar-left navbar-form nav-search">
                      <div class="input-group">
                        <input
                          type="text"
                          placeholder="Search ..."
                          class="form-control"
                        />
                      </div>
                    </form>
                  </ul>
                </li>
              
                <li class="nav-item topbar-user dropdown hidden-caret">
                  <a
                    class="dropdown-toggle profile-pic"
                    data-bs-toggle="dropdown"
                    href="#"
                    aria-expanded="false"
                  >
                    <div class="avatar-sm">
                      <img
                        src="{{asset('user7/img/foto.jpg')}}"
                        alt="..."
                        class="avatar-img rounded-circle"
                      />
                    </div>
                    <span class="profile-username">
                      <span class="op-7">Halo </span>
                      @if(Auth::check())
    <span class="fw-bold">{{ Auth::user()->name }}</span>
@endif
                    </span>
                  </a>
                  <ul class="dropdown-menu dropdown-user animated fadeIn">
                    <div class="dropdown-user-scroll scrollbar-outer">
                      <li>
                        <a class="dropdown-item" href="{{ route('logout') }}"   onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();">Logout</a>
                      </li>
                      <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          <!-- End Navbar -->
        </div>
