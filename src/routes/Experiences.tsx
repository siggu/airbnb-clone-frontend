import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { getExperiences } from "../api";
import Experience from "../components/Experience";
import { IExperienceList } from "../types";
import RoomSkeleton from "../components/RoomSkeletom";

export default function Experiences() {
  const { data, isLoading } = useQuery<IExperienceList[]>({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });
  return (
    <Grid
      mt={"10"}
      px={{
        sm: 10,
        lg: 20,
      }}
      columnGap={"4"}
      rowGap={"8"}
      templateColumns={{
        sm: "1fr 1fr",
        md: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      <Helmet>
        <title>{data ? "Experiences" : "loading..."}</title>
      </Helmet>
      {data?.map((experience) => (
        <Experience
          key={experience.pk}
          pk={experience.pk}
          isOwner={experience.is_host}
          imageUrl={experience.photos[0]?.file ?? ""}
          name={experience.name}
          rating={experience.rating}
          city={experience.city}
          country={experience.country}
          price={experience.price}
        />
      ))}
    </Grid>
  );
}
