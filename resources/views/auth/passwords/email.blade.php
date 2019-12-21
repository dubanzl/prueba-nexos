@extends('layouts.base')

@section('content')
<div class="register container">
    <div class="row justify-content-center">
        <img class="bank-icon" src="{{URL::asset('/images/bank.png')}}" alt="bank icon">
    </div>
   <div class="row justify-content-center">
        <div class="col-md-4 register-box">
        <form  method="POST" action="{{ route('password.email') }}">
            @csrf
            <h2 class="login-title">Recuperar Contraseña</h2>

            <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input id="email" type="email" placeholder="Correo electrónico" class="form-control @error('email') is-invalid @enderror" aria-describedby="correo electrónico" name="email" value="{{ old('email') }}" >
                @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <button type="submit" class="btn btn-primary">Recuperar Contraseña</button>
            <div class="register-account-link text-center">
                ¿Ya tienes cuenta? <a class="text-center"  href="{{ route('login') }}">Inicia sesión aquí</a>
                <hr>
                ¿No tienes cuenta?<a class="text-center"  href="{{ route('login') }}"> Crea una aquí</a>

            </div>
         </form>
        </div>
   </div>
</div>
<!--
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Reset Password') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Send Password Reset Link') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> -->
@endsection
