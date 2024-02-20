import { HStack, Divider, VStack, Button, Box, Text } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";
import { SiNaver } from "react-icons/si";

export default function SocialLogin() {
  const kakaoParams = {
    response_type: "code",
    client_id: "564d95aa68dfb025d4f3726ecaac2764",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
  };
  const kakaoparams = new URLSearchParams(kakaoParams).toString();
  const naverParams = {
    response_type: "code",
    client_id: "2703L1b20ifbv5ml0jVy",
    redirect_uri: "http://127.0.0.1:3000/social/naver",
  };
  const naverparams = new URLSearchParams(naverParams).toString();
  return (
    <Box mb="4">
      <HStack my={8}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray" fontSize={"xs"} as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=10136d2489a8c313cbe4&scope=read:user,user:email"
          w="100%"
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${kakaoparams}`}
          w="100%"
          leftIcon={<FaComment />}
          colorScheme="yellow"
        >
          Continue with Kakao
        </Button>
        <Button
          as={"a"}
          href={`https://nid.naver.com/oauth2.0/authorize?${naverparams}`}
          w={"100%"}
          leftIcon={<SiNaver />}
          colorScheme="green"
        >
          Continue with Naver
        </Button>
      </VStack>
    </Box>
  );
}
