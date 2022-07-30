import { useState, useEffect } from "react";
import axios from "axios";

export const BookCreate = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const [place, setPlace] = useState("");

  const getBooks = async (keyword) => {
    const url = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
    const result = await axios.get(`${url}${keyword}`);
    console.log(result.data);
    setBooks(result.data.items ?? []);
  };

  const selectBook = (book) => {
    setBook(book.volumeInfo.title);
  };

  const success = async (position) => {
    const { latitude, longitude } = position.coords;
    setGeoLocation({ latitude, longitude });
    const placeData = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    console.log(placeData.data);
    setPlace(placeData.data.display_name);
  };




  const fail = (error) => console.log(error);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>場所</td>
            <td>{place}</td>
          </tr>
          <tr>
            <td>読んだ本</td>
            <td>{book}</td>
          </tr>
        </tbody>
      </table>
      <p>キーワードで検索する</p>
      <input type="text" onChange={(e) => getBooks(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>書籍名</th>
            <th>出版社</th>
            <th>出版年</th>
            <th>リンク</th>
          </tr>
        </thead>
        <tbody>
          {books.map((x, i) => (
            <tr key={i}>
              <td>
                <button type="button" onClick={() => selectBook(x)}>
                  選択
                </button>
              </td>
              <td>{x.volumeInfo.title}</td>
              <td>{x.volumeInfo.publisher}</td>
              <td>{x.volumeInfo.publishedDate}</td>
              <td>
                <a
                  href={x.volumeInfo.infoLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};