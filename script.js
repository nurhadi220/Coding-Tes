const kamus = {
  A: "0",
  B: "1",
  C: "1",
  D: "1",
  E: "2",
  F: "3",
  G: "3",
  H: "3",
  I: "4",
  J: "5",
  K: "5",
  L: "5",
  M: "5",
  N: "5",
  O: "6",
  P: "7",
  Q: "7",
  R: "7",
  S: "7",
  T: "7",
  U: "8",
  V: "9",
  W: "9",
  X: "9",
  Y: "9",
  Z: "9",
  a: "9",
  b: "8",
  c: "8",
  d: "8",
  e: "7",
  f: "6",
  g: "6",
  h: "6",
  i: "5",
  j: "4",
  k: "4",
  l: "4",
  m: "4",
  n: "4",
  o: "3",
  p: "2",
  q: "2",
  r: "2",
  s: "2",
  t: "2",
  u: "1",
  v: "0",
  w: "0",
  x: "0",
  y: "0",
  z: "0",
  " ": "0",
};
const newKamus = {
  0: "A",
  1: "B",
  2: "E",
  3: "F",
  4: "I",
  5: "J",
  6: "O",
  7: "P",
  8: "U",
  9: "V",
};

document.getElementById("inputKata").onsubmit = function (event) {
  event.preventDefault();

  //ambil kata yang dimasukan
  const inputText = document.getElementById("kata").value;
  let outputText = "";

  //================================ Nomor 1 ======================================
  //kita pecah kata menjadi huruf berdasarkan kamus
  for (let char of inputText) {
    outputText += kamus[char] || "";
  }
  //hasil konversi ditampilkan (nomor 1)
  document.getElementById("hasil1").textContent = outputText;
  //===============================================================================

  //================================ Nomor 2 ======================================

  let total = parseInt(outputText[0]); //ambil angka pertama dari string
  let operasiDetail = [parseInt(outputText[0])]; //untuk menyimpan detail operasi berupa array

  //penjabaran operasi dengan menjumlahkan dan mengurangkan sebuah nilai berdasarkan ganjil genap nya nilai
  for (let i = 1; i < outputText.length; i++) {
    let nilai = parseInt(outputText[i]);
    if (i % 2 === 1) {
      total += nilai;
      operasiDetail.push(nilai); //menampilkan nilai positif
    } else {
      total -= nilai;
      operasiDetail.push(-nilai); //menampilkan nilai negatif
    }
  }
  document.getElementById("hasilOperasi").textContent = total;

  //penjabaran operasi ditampilkan setelah operasi looping selesai
  let penjabaranHasil = operasiDetail

    //Mengubah detail operasi [array] jadi string penjabaran
    .map((nilai, index) => {
      return index === 0
        ? `${nilai}` //nilai di tampilkan tanpa tanda + atau - (apa adanya)
        : nilai >= 0
        ? `+ ${nilai}` //nilai positif di tampilkan dengan tanda +
        : `- ${Math.abs(nilai)}`; //nilai negatif di tampilkan dengan tanda - dan nilai diubah menjadi positif
    })
    .join(" ");
  document.getElementById("penjabaranOperasi").textContent = penjabaranHasil;
  //===============================================================================

  //================================ Nomor 3 ======================================
  let totalPositif = Math.abs(total); // Mengubah nilai total menjadi positif (untuk menghindari hasil negatif)
  let hasilHuruf = "";
  let akumulasi = 0; // Menyimpan jumlah akumulasi angka yang sedang dihitung
  let angkaUntukKonversi = 0; // Menyimpan angka saat ini yang akan dikonversi ke huruf melalui newKamus

  // Konversi angka ke huruf secara bertahap sampai mencapai totalPositif
  while (akumulasi < totalPositif) {
    let sisa = totalPositif - akumulasi;

    // Jika angka yang akan dikonversi melebihi sisa, sesuaikan agar tidak melebihi total
    if (angkaUntukKonversi > sisa) {
      angkaUntukKonversi = sisa;
    }

    akumulasi += angkaUntukKonversi; // Tambahkan angka saat ini ke total akumulasi
    hasilHuruf += newKamus[angkaUntukKonversi]; // Ambil huruf dari kamus berdasarkan angka dan tambahkan ke hasil

    angkaUntukKonversi++; // Naikkan angka untuk iterasi berikutnya
    if (angkaUntukKonversi > 9) {
      // Jika sudah lewat dari 9, ulangi dari 0 (siklus angka 0–9)
      angkaUntukKonversi = 0;
    }
  }

  document.getElementById("hasilHuruf").textContent = hasilHuruf;
  //==============================================================================

  // ============================= Nomor 4 ======================================
  // Mengubah huruf hasil sebelumnya (hasilHuruf) kembali menjadi deretan angka baru
  let angkaKembali = convertLettersToNumbers(hasilHuruf, kamus); // Menggunakan fungsi convertLettersToNumbers untuk konversi

  // Mulai operasi baru dari angka hasil konversi huruf
  let angkaArray = angkaKembali.split("").map(Number);
  let totalBaru = 0;
  let operasiDetailBaru = [];

  for (let i = 0; i < angkaArray.length; i += 3) {
    let grup = angkaArray.slice(i, i + 3);
    let grupSum = grup.reduce((a, b) => a + b, 0);
    totalBaru += grupSum;
    operasiDetailBaru.push(`(${grup.join(" + ")})`);
  }

  let penjabaranOpBaru = operasiDetailBaru.join(" ");
  document.getElementById("penjabaranOperasiBaru").textContent =
    penjabaranOpBaru;
  document.getElementById("hasilAngka").textContent = totalBaru;
  // ============================================================================

  // ============================= Nomor 5 ======================================
  // Ubah hasil totalBaru kembali menjadi huruf baru menggunakan newKamus
  let processSum = 0;
  let newestNum = 0;
  let hasilHurufBaru = "";

  while (processSum < totalBaru) {
    let perbedaan = totalBaru - processSum;
    if (newestNum > perbedaan) {
      newestNum = perbedaan;
    }
    processSum += newestNum;
    hasilHurufBaru += newKamus[newestNum];
    newestNum++;
    if (newestNum > 9) {
      newestNum = 0;
    }
  }
  document.getElementById("hasilHurufBaru").textContent = hasilHurufBaru;

  // Konversi hasilHurufBaru kembali jadi angka, lalu tampilkan hasil akhir
  let angkaBaru = convertLettersToNumbers(hasilHurufBaru, kamus);

  document.getElementById("konversiHurufBaru").textContent = angkaBaru;
  document.getElementById("Final").textContent = hasilHurufBaru;
  // ================================================================================

  // ============================= Fungsi =================================
  function convertLettersToNumbers(text, dictionary) {
    return text
      .split("")
      .map((char) => dictionary[char] || "")
      .join("");
  }
  // ======================================================================
};
