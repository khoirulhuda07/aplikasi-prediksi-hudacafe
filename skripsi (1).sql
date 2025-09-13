-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Jun 2025 pada 21.38
-- Versi server: 10.4.25-MariaDB
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skripsi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `penjualan`
--

CREATE TABLE `penjualan` (
  `ID_PENJUALAN` int(11) NOT NULL,
  `ID_PRODUK` int(11) DEFAULT NULL,
  `BULAN` date DEFAULT NULL,
  `JUMLAH` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `penjualan`
--

INSERT INTO `penjualan` (`ID_PENJUALAN`, `ID_PRODUK`, `BULAN`, `JUMLAH`) VALUES
(86, 1, '2024-04-01', 352),
(87, 1, '2024-05-01', 296),
(88, 1, '2024-06-01', 344),
(89, 1, '2024-07-01', 304),
(90, 1, '2024-08-01', 467),
(91, 1, '2024-09-01', 332),
(92, 1, '2024-10-01', 328),
(93, 1, '2024-11-01', 290),
(94, 1, '2024-12-01', 311),
(95, 1, '2025-01-01', 308),
(96, 1, '2025-02-01', 301),
(97, 1, '2025-03-01', 322),
(98, 1, '2025-04-01', 333),
(99, 1, '2025-05-01', 330),
(100, 2, '2024-04-01', 209),
(101, 2, '2024-05-01', 210),
(102, 2, '2024-06-01', 222),
(103, 2, '2024-07-01', 250),
(104, 2, '2024-08-01', 235),
(105, 2, '2024-09-01', 243),
(106, 2, '2024-10-01', 203),
(107, 2, '2024-11-01', 239),
(108, 2, '2024-12-01', 290),
(109, 2, '2025-01-01', 250),
(110, 2, '2025-02-01', 230),
(111, 2, '2025-03-01', 237),
(112, 2, '2025-04-01', 211),
(113, 2, '2025-05-01', 217),
(114, 3, '2024-04-01', 191),
(115, 3, '2024-05-01', 201),
(116, 3, '2024-06-01', 212),
(117, 3, '2024-07-01', 189),
(118, 3, '2024-08-01', 227),
(119, 3, '2024-09-01', 247),
(120, 3, '2024-10-01', 250),
(121, 3, '2024-11-01', 207),
(122, 3, '2024-12-01', 236),
(123, 3, '2025-01-01', 210),
(124, 3, '2025-02-01', 205),
(125, 3, '2025-03-01', 198),
(126, 3, '2025-04-01', 201),
(127, 3, '2025-05-01', 231);

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `ID_PRODUK` int(11) NOT NULL,
  `NAMA_PRODUK` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`ID_PRODUK`, `NAMA_PRODUK`) VALUES
(1, 'kopi hitam'),
(2, 'kopi susu'),
(3, 'good day');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `level` enum('admin','user') COLLATE utf8mb4_unicode_ci DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `level`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, '$2y$10$EonESA0Nf0fFfI4vbQER5edCpAZFVUoJSV/xEOoqboUXexCHwkhie', NULL, '2025-04-25 10:55:35', '2025-04-25 10:55:35', 'admin'),
(2, 'user', 'user@gmail.com', NULL, '$2y$10$7mdCoG/fx5hPR7S.5VtKe..VS3Km9MAt4ZICUrU1AnNpqntyZcnSW', NULL, NULL, NULL, 'user');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`ID_PENJUALAN`),
  ADD KEY `Fk_MENGAMBIL` (`ID_PRODUK`);

--
-- Indeks untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`ID_PRODUK`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  MODIFY `ID_PENJUALAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT untuk tabel `produk`
--
ALTER TABLE `produk`
  MODIFY `ID_PRODUK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `Fk_MENGAMBIL` FOREIGN KEY (`ID_PRODUK`) REFERENCES `produk` (`ID_PRODUK`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
