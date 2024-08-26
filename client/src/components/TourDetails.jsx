import { useEffect, useState } from "react";
import { getTour } from "../helperFuncs/TourHandlers";
import { useParams } from "react-router-dom";
import TourOverview from "./TourOverview";
import { toast } from "sonner";
import Preloader from "./preLoader";
import React from "react";

export default function TourDetails() {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await getTour(id);
          const fetchedData = res.data.data.doc;
          // const url = `/tours/${fetchedData.slug}`;
          // window.history.replaceState(null, "", url);
          setTour(fetchedData);
          setLoading(false);
        } catch (err) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  return (
    <div>{loading ? <Preloader /> : tour && <TourOverview tour={tour} />}</div>
  );
}
