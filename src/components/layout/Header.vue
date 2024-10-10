<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a>Filmes</a>
            <ul class="p-2">
              <li><a>Populares</a></li>
              <li><a>Tendências</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h18M3 7h18M3 7v13h18V7M3 3l4 4m0-4l4 4m0-4l4 4m0-4l4 4"
          />
        </svg>
      </div>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>Populares</a></li>
        <li><a>Tendências</a></li>
      </ul>
      <!-- <ul class="menu menu-horizontal px-1">
        <li>
          <details>
            <summary>Filmes</summary>
            <ul class="p-2">
              <li><a>Populares</a></li>
              <li><a>Tendências</a></li>
            </ul>
          </details>
        </li>
      </ul> -->
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
