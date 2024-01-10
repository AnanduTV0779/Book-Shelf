import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";

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

interface BookListProps {
  books: Book[];
  searchName: string;
}

const BookList: React.FC<BookListProps> = ({ books, searchName }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Box sx={{ marginTop: "60px" }}>
      {books.length > 0 ? (
        <Grid container spacing={2}>
          {books?.map((book, index) => {
            return (
              <Grid item key={index}>
                <Card
                  key={book.key}
                  sx={{
                    width: isMobile ? 280 : 220,
                    height: isMobile ? 360 : 300,
                    margin: 0,
                    borderRadius: 4,
                    boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    position: "relative", // Add this style
                    backgroundColor: "rgba(238,211,196,0.8)", // Set the alpha value (0.7 for 70% transparency)
                    backgroundSize: "cover",
                  }}
                >
                  {/* Overlay to add a gradient effect */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 200%)",
                    }}
                  ></div>

                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "black", // Change text color to white
                        marginBottom: "30px",
                        marginTop: "8px",
                        lineHeight: "1.2",
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "12px",
                        fontStyle: "italic",
                        color: "black", // Change text color to white
                        marginBottom: "15px",
                      }}
                    >
                      Author:{" "}
                      {book.author_name?.length <= 3
                        ? book.author_name.join(", ")
                        : `${book.author_name?.slice(0, 3).join(", ")} ...`}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "12px",
                        fontStyle: "italic",
                        color: "black", // Change text color to white
                        marginBottom: "15px",
                      }}
                    >
                      Number of pages: {book.number_of_pages_median}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "12px",
                        fontStyle: "italic",
                        color: "black", // Change text color to white
                        marginBottom: "15px",
                      }}
                    >
                      First Publish Year: {book.first_publish_year}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "12px",
                        fontStyle: "italic",
                        color: "black", // Change text color to white
                        marginBottom: "15px",
                      }}
                    >
                      ISBN:{" "}
                      {book.isbn?.length <= 3
                        ? book.isbn.join(", ")
                        : `${book.isbn?.slice(0, 3).join(", ")} ...`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography
          sx={{
            margin: "30px",
            display: "flex",
            justifyContent: "center",
            color: "white",
          }}
          variant="h4"
          color="text.primary"
        >
          {searchName ? "! No Book found." : "Please Search the book !"}
        </Typography>
      )}
    </Box>
  );
};

export default BookList;
