import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { Helmet } from "react-helmet";
import { useMutation } from "@tanstack/react-query";
import { getUploadURL, uploadImage } from "../api";

interface IForm {
  file: FileList;
}

interface IUploadRULResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch } = useForm<IForm>();
  const { roomPk } = useParams();
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data: any) => {
      console.log(data);
    },
  });
  const upLoadURLMutation = useMutation({
    mutationFn: getUploadURL,
    onSuccess: (data: IUploadRULResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  useHostOnlyPage();
  const onSubmit = (data: any) => {
    upLoadURLMutation.mutate();
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
            <title>Upload Photo</title>
          </Helmet>
          <Heading textAlign={"center"}>Upload a Photo</Heading>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={5}
            mt={10}
          >
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button type="submit" w={"full"} colorScheme="red">
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
