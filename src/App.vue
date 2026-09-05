<template>
<nav dir="rtl"><b>سكني</b><div><RouterLink to="/dashboard">لوحة التحكم</RouterLink><RouterLink to="/add-room">إضافة غرفة</RouterLink><RouterLink to="/report">الإبلاغ عن مشكلة</RouterLink></div></nav>
<RouterView/>
</template>
<style>
*{box-sizing:border-box}body{margin:0;background:#f8f8f8;font-family:Arial,sans-serif}
nav{height:68px;background:#324E7B;color:white;padding:0 6%;display:flex;align-items:center;justify-content:space-between;gap:20px}
nav b{font-size:24px}nav div{display:flex;gap:8px;flex-wrap:wrap}nav a{color:white;text-decoration:none;padding:9px 13px;border-radius:8px}nav a:hover,nav a.router-link-active{background:#5068A9}
</style>