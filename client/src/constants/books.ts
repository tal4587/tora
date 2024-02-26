const bookNumberToPath = new Map<number, RequestInfo>();
bookNumberToPath.set(1, "/json/books/1.Genesis.json");
bookNumberToPath.set(2, "/json/books/2.Exodus.json");
bookNumberToPath.set(3, "/json/books/3.Leviticus.json");
bookNumberToPath.set(4, "/json/books/4.Bamidbar.json");
bookNumberToPath.set(5, "/json/books/5.Deuteronomy.json");

export default bookNumberToPath;