import React, { useEffect, useState } from "react";
import { getBooks } from "../serviceHandler/book";
import { AxiosResponse } from "axios";
import { useDebounce } from "../serviceHandler/useDebounce";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import BookCard from "./common/cards";
import useStyles from "./style";
import Loader from "./common/loader";

export interface Book {
  key: string;
  type: string;
  seed: string[];
  title: string;
  title_sort: string;
  title_suggest: string;
  edition_count: number;
  edition_key: string[];
  publish_date: string[];
  publish_year: number[];
  first_publish_year: number;
  number_of_pages_median: number;
  lccn: string[];
  publish_place: string[];
  oclc: string[];
  contributor: string[];
  lcc: string[];
  ddc: string[];
  isbn: string[];
  last_modified_i: number;
  ebook_count_i: number;
  ebook_access: string;
  has_fulltext: boolean;
  public_scan_b: boolean;
  ia: string[];
  ia_collection: string[];
  ia_collection_s: string;
  lending_edition_s: string;
  lending_identifier_s: string;
  printdisabled_s: string;
  ratings_average: number;
  ratings_sortable: number;
  ratings_count: number;
  ratings_count_1: number;
  ratings_count_2: number;
  ratings_count_3: number;
  ratings_count_4: number;
  ratings_count_5: number;
  readinglog_count: number;
  want_to_read_count: number;
  currently_reading_count: number;
  already_read_count: number;
  cover_edition_key: string;
  cover_i: number;
  first_sentence: string[];
  publisher: string[];
  language: string[];
  author_key: string[];
  author_name: string[];
  author_alternative_name: string[];
  place: string[];
  subject: string[];
  id_amazon: string[];
  id_better_world_books: string[];
  id_goodreads: string[];
  id_librarything: string[];
  ia_box_id: string[];
  publisher_facet: string[];
  place_key: string[];
  subject_facet: string[];
  _version_: number;
  place_facet: string[];
  lcc_sort: string;
  author_facet: string[];
  subject_key: string[];
  ddc_sort: string;
}

const Search: React.FC = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [booksTemp, setBooksTemp] = useState<Book[]>([]);
  const [sortByYear, setSortByYear] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const classes = useStyles();

  const getBooksFromAPI = async () => {
    try {
      const response: AxiosResponse<any, any> = await getBooks(searchName);
      setBooks(response.data.docs);
      setBooksTemp(response.data.docs);
      setIsLoading(false);
    } catch (error) {
      setBooks([]);
      setIsLoading(false);
    }
  };

  const debounceGetBooks = useDebounce(getBooksFromAPI, 1000);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSortToggle = () => {
    setSortByYear((prev) => !prev);
  };

  useEffect(() => {
    if (searchName) {
      setIsLoading(true);
      debounceGetBooks(searchName);
    }
  }, [searchName]);

  useEffect(() => {
    if (sortByYear && books.length > 0) {
      const sortedBooks = [...books].sort((a, b) => {
        const yearA = a.first_publish_year || Infinity;
        const yearB = b.first_publish_year || Infinity;
        return yearA - yearB;
      });
      setBooks(sortedBooks);
    } else {
      setBooks(booksTemp);
    }
  }, [sortByYear]);

  return (
    <Box className={classes.container}>
      <Typography
        sx={{
          margin: "30px",
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
        variant="h4"
      >
        Book Shelf
      </Typography>
      <Box
        sx={
          isMobile
            ? { display: "flex", flexDirection: "column", gap: "10px" }
            : { display: "flex", justifyContent: "left", gap: "10px" }
        }
        className={classes.header}
      >
        <TextField
          value={searchName}
          onChange={handleOnchange}
          variant="outlined"
          placeholder="Search a Book here...!"
          sx={
            isMobile
              ? { borderRadius: "8px", minWidth: "230px" }
              : {
                  borderRadius: "8px",
                  width:
                    books.length > 0 && !isLoading
                      ? "calc(4/6 * 100%)"
                      : "calc(3/3 * 100%)",
                }
          }
          inputProps={{
            style: {
              backgroundColor: "rgba(166,148,137,0.8)",
              borderRadius: "8px",
            },
          }}
        />
        {!isLoading && books.length > 0 && (
          <Button
            variant="outlined"
            onClick={handleSortToggle}
            sx={
              isMobile
                ? {
                    width: "calc(2/6 * 100%)",
                    minWidth: "230px",
                    height: "56px",
                    backgroundColor: "rgb(166,148,137,0.8)",
                    color: "black",
                    ":hover": {
                      backgroundColor: "lightgray",
                    },
                  }
                : {
                    width: "calc(0.5/3 * 100%)",
                    minWidth: "230px",

                    height: "56px",
                    backgroundColor: "rgb(166,148,137,0.8)",
                    color: "black",
                    ":hover": {
                      backgroundColor: "lightgray",
                    },
                  }
            }
          >
            {sortByYear ? "Sort by Relevance" : "Sort by Year"}
          </Button>
        )}
      </Box>
      {!isLoading ? (
        <BookCard books={books} searchName={searchName} />
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default Search;
