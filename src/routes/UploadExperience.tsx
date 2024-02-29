import { useForm } from "react-hook-form";
import {
  IUploadExperienceVariables,
  getCategories,
  getPerks,
  getExperiencePerks,
  uploadExperience,
} from "../api";
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { ICategory, IExperienceDetail, IPerk } from "../types";
import { Helmet } from "react-helmet";

export default function UploadExperience() {
  const { register, handleSubmit } = useForm<IUploadExperienceVariables>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: uploadExperience,
    onSuccess: (data: IExperienceDetail) => {
      toast({
        status: "success",
        title: "Experience created",
        position: "bottom-right",
      });
      navigate(`/experiences/${data.pk}`);
    },
  });
  const { data: perks, isLoading: isPerksLoading } = useQuery<IPerk[]>({
    queryKey: ["perks"],
    queryFn: getPerks,
  });
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  useHostOnlyPage();
  const onSubmit = (data: IUploadExperienceVariables) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Helmet>
            <title>
              {perks && categories ? "Upload Experience" : "loading..."}
            </title>
          </Helmet>
          <Heading textAlign={"center"}>Upload Experience</Heading>
          <VStack
            spacing={10}
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input {...register("name", { required: true })} type="text" />
              <FormHelperText>Write the name of your experience</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
              <Input {...register("country", { required: true })} type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input {...register("city", { required: true })} type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input {...register("address", { required: true })} type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                {...register("price", { required: true })}
                type="number"
                min={0}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea {...register("description", { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox {...register("pet_friendly")}>Pet friendly?</Checkbox>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder="Choose a category"
              >
                {categories?.map((cateogry) => (
                  <option key={cateogry.pk} value={cateogry.pk}>
                    {cateogry.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                What category describes your experience?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Perks</FormLabel>
              <Grid templateColumns={"1fr 1fr"} gap={5}>
                {perks?.map((perk) => (
                  <Box key={perk.pk}>
                    <Checkbox
                      value={perk.pk}
                      {...register("perks", { required: true })}
                    >
                      {perk.name}
                    </Checkbox>
                    <FormHelperText>{perk.explanation}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            {mutation.isError ? (
              <Text color={"red.500"}>Something went wrong</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.status === "pending"}
              colorScheme={"red"}
              size={"lg"}
              w={"100%"}
            >
              Upload Experience
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
