<!--
 * @Author: fanjf
 * @Date: 2022-11-28 16:23:17
 * @LastEditTime: 2022-12-06 09:15:35
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\views\noMatch\noMatch.vue
 * @Description: 🎉🎉🎉
-->
<script setup>
</script>

<template>
    <div class="body">
        <div class="noise"></div>
        <div class="overlay"></div>
        <div class="terminal">
            <h1>Error <span class="errorcode">404</span></h1>
            <p class="output">The page you are looking for might have been removed, had its name changed or is
                temporarily unavailable.</p>
            <p class="output">Please try to <a @click="$router.push('/home')">return to the homepage</a>.</p>
            <p class="output">Good luck.</p>
        </div>
    </div>
</template>
<style scoped>
/* vietnamese */
@font-face {
    font-family: 'Inconsolata';
    font-style: normal;
    font-weight: 400;
    font-stretch: 100%;
    src: url('../../style/font/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8WRL2l2eY.woff2') format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}

/* latin-ext */
@font-face {
    font-family: 'Inconsolata';
    font-style: normal;
    font-weight: 400;
    font-stretch: 100%;
    src: url('../../style/font/2.woff2') format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

/* latin */
@font-face {
    font-family: 'Inconsolata';
    font-style: normal;
    font-weight: 400;
    font-stretch: 100%;
    src: url('../../style/font/3.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

.body {
    padding: 0;
    /* width: 100%; */
    box-sizing: border-box;
    height: 100%;
    background-color: #000000;
    background-image: radial-gradient(#11581E, #041607);
    background-repeat: no-repeat;
    background-size: cover;
    font-family: 'Inconsolata', Helvetica, sans-serif;
    font-size: 1.5rem;
    color: rgba(128, 255, 128, 0.8);
    text-shadow:
        0 0 1ex rgba(51, 255, 51, 1),
        0 0 2px rgba(255, 255, 255, 0.8);
}

.noise {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    /* background-image: url('../../assets/giphy.gif'); */
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    opacity: .06;
}

.overlay {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background:
        repeating-linear-gradient(180deg,
            rgba(0, 0, 0, 0) 0,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0) 100%);
    background-size: auto 4px;
    z-index: 1;
}

.overlay::before {
    content: "";
    pointer-events: none;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(0deg,
            transparent 0%,
            rgba(32, 128, 32, 0.2) 2%,
            rgba(32, 128, 32, 0.8) 3%,
            rgba(32, 128, 32, 0.2) 3%,
            transparent 100%);
    background-repeat: no-repeat;
    animation: scan 5.5s linear 0s infinite;
}

@keyframes scan {
    0% {
        background-position: 0 -100vh;
    }

    35%,
    100% {
        background-position: 0 100vh;
    }
}

.terminal {
    box-sizing: inherit;
    position: absolute;
    height: 100%;
    width: 1000px;
    max-width: 100%;
    padding: 4rem;
    text-transform: uppercase;
}

.output {
    color: rgba(128, 255, 128, 0.8);
    text-shadow:
        0 0 1px rgba(51, 255, 51, 0.4),
        0 0 2px rgba(255, 255, 255, 0.8);
}

.output::before {
    content: "> ";
}

/*
.input {
  color: rgba(192, 255, 192, 0.8);
  text-shadow:
      0 0 1px rgba(51, 255, 51, 0.4),
      0 0 2px rgba(255, 255, 255, 0.8);
}

.input::before {
  content: "$ ";
}
*/

a {
    color: #fff;
    text-decoration: none;
}

a::before {
    content: "[";
}

a::after {
    content: "]";
}

.errorcode {
    color: white;
}
</style>