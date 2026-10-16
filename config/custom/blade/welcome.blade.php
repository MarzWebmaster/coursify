<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Coursify API</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <style>
            /* tailwind preflight injected by build - kept minimal */
            *,::after,::before{box-sizing:border-box;border-width:0;border-style:solid}
            html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:Figtree, sans-serif}
            body{margin:0;line-height:inherit}
            h1{font-size:inherit;font-weight:inherit}
            a{color:inherit;text-decoration:inherit}
            section{display:block}
            .relative{position:relative}.mx-auto{margin-left:auto;margin-right:auto}
            .mx-6{margin-left:1.5rem;margin-right:1.5rem}.mt-16{margin-top:4rem}
            .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}
            .min-h-screen{min-height:100vh}.max-w-7xl{max-width:80rem}
            .rounded-lg{border-radius:.5rem}.bg-white{background-color:#fff}
            .bg-dots-darker{background-image:url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E")}
            .p-6{padding:1.5rem}.text-center{text-align:center}
            .text-xl{font-size:1.25rem;line-height:1.75rem}.font-semibold{font-weight:600}
            .leading-relaxed{line-height:1.625}
            .text-gray-600{color:#4b5563}.text-gray-900{color:#111827}
            .shadow-2xl{box-shadow:0 25px 50px -12px rgba(0,0,0,.25)}
        </style>
    </head>
    <body class="antialiased">
    <section class="py-24 flex items-center min-h-screen justify-center bg-white">
        <div class="mx-auto max-w-[43rem]">
            <div class="text-center">
                <p class="text-lg font-medium leading-8" style="color:#6D28D9">{{__('Congratulations 🎉')}} </p>
                <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-gray-900">If you're seeing this {{ config('app.name') }} API is running</h1>
            </div>
        </div>
    </section>
    </body>
</html>
