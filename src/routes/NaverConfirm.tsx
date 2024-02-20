import { VStack, Heading, Spinner, Text, useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { naverLogIn } from "../api";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function NaverConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const code = params.get("code");
  const mutation = useMutation({
    mutationFn: naverLogIn,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess() {
      toast({
        status: "success",
        title: "Welcome!",
        description: "Happy to see you!",
      });
      queryClient.refetchQueries({
        queryKey: ["me"],
      });
      navigate("/");
    },
    onError() {
      toast({
        status: "error",
        title: "Error in Continue with naver",
        description: "There's something error with Naver Log In",
      });
    },
  });
  useEffect(() => {
    if (code) {
      mutation.mutate(code);
    }
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Helmet>
        <title>Naver LogIn</title>
      </Helmet>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
}
