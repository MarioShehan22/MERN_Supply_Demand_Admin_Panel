import {useEffect, useState} from "react";
import {FaStar} from "react-icons/fa";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import AxiosInstance from "@/config/AxiosInstance";

export type Ratings = {
    email: string | '',
    comment: string | '',
    currentRating: number|0,
    _id: string|'',
}

const ReviewDetailPage = () => {
    const [ratings, setRatings] = useState<Ratings[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getRatingData();
    }, []);
    const getRatingData = async () => {
        try {
            const response = await AxiosInstance.get<Ratings[]>("/reviews/find-all");
            setRatings(response.data);
        } catch (error) {
            setError("Error fetching ratings");
        }
    };
  return(
      <>
          <h2>Rating Page</h2>
          <div className="mx-auto xl:max-w-screen-xl md:max-w-screen-md">
              {error ? (<p className="text-red-500 font-bold">Error: {error}</p>) : ratings.length > 0 ? (
                  <div className="mt-12 w-full">
                      <Table>
                          <TableCaption>A list of your recent ratings</TableCaption>
                          <TableHeader>
                              <TableRow className="lg:text-xl md:text-lg">
                                  <TableHead className="w-[100px] text-center">id</TableHead>
                                  <TableHead className="text-center">Email</TableHead>
                                  <TableHead className="text-center">Comment</TableHead>
                                  <TableHead className="text-center">Ratings</TableHead>
                                  <TableHead className="text-center">Operation</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody className="lg:text-lg md:text-base">
                              {ratings.map((rating, index) => (
                                  <TableRow key={index}>
                                      <TableCell className="font-medium text-center">{index+1}</TableCell>
                                      <TableCell className="font-medium text-center">{rating.email}</TableCell>
                                      <TableCell className="text-center">{rating.comment}</TableCell>
                                      <TableCell className="flex text-center">
                                          {Array.from({ length: rating.currentRating }).map((_, i) => (
                                              <FaStar key={i} color={'#FCC82F'} size={40} />
                                          ))}
                                      </TableCell>
                                      <TableCell className="text-center">
                                          <button
                                              className="py-2 w-[100px] rounded-md bg-red-400 text-black hover:bg-red-600 text-white duration-300 bg-none"
                                              onClick={()=>{
                                                  if(confirm('are you sure?')){
                                                      AxiosInstance.delete("/reviews/delete" + rating._id)
                                                          .then(getRatingData);
                                                  }
                                              }}
                                          >Delete
                                          </button>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </div>
              ) : (
                  <p>No ratings found yet.</p>
              )}
          </div>
      </>
  );
}
export default ReviewDetailPage
