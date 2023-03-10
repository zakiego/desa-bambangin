import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";

import { DUMMY_IMAGE } from "~/src/lib/constans";
import { GetAllPosts } from "~/src/server/routes/post";
import getImage from "~/src/utils/getImage";

interface Props {
  berita: GetAllPosts["posts"][];
}

export const Highlight: React.FC<Props> = ({ berita }) => {
  return (
    <Box rounded="md" px="6" py="6" bg="gray.50">
      <Container maxW="container.xl">
        <Heading>Berita Terbaru</Heading>
        <Stack direction={{ base: "column", lg: "row" }} pt="5" spacing="5">
          {berita.map((berita, id) => {
            return <HighlightCard key={id} {...berita} />;
          })}
        </Stack>
        <Box pt="5">
          <Link href="/berita">
            <Button
              w={{ base: "full", md: "max-content" }}
              size="sm"
              variant="solid"
              bg="primary.400"
              color="white"
              _hover={{
                bg: "primary.500",
              }}
              _active={{
                bg: "primary.500",
              }}
            >
              Lihat Berita Lainnya <GoChevronRight />
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

const HighlightCard: React.FC<GetAllPosts["posts"]> = ({
  post_title,
  post_content,
  post_date,
  post_name,
  thumbnail,
}) => {
  return (
    <Box w={{ base: "full", lg: "33%" }}>
      <Link href={`/berita/${post_name}`}>
        <Stack
          p="2"
          spacing="4"
          alignItems="center"
          direction={{ base: "row", lg: "row" }}
          bg="gray.50"
          w="full"
          borderRadius="md"
          _hover={{ cursor: "pointer", bg: "gray.100" }}
          data-component-name="BeritaCard"
        >
          <Box
            w={{ base: "40%", md: "40%" }}
            h="32"
            borderRadius="md"
            position="relative"
          >
            <Image
              src={thumbnail ? getImage(thumbnail) : DUMMY_IMAGE}
              fill
              quality={30}
              alt={`image ${post_name}`}
              style={{
                objectFit: "cover",
                borderRadius: "0.375rem",
              }}
            />
          </Box>
          <Stack w={{ base: "60%", md: "60%" }}>
            <Text
              fontSize={{ base: "md", md: "md" }}
              fontWeight="bold"
              color="gray.800"
              sx={{
                '[data-component-name="BeritaCard"]:hover &': {
                  color: "primary.500",
                },
              }}
              noOfLines={2}
            >
              {post_title}
            </Text>
            <Text
              display={{ base: "none", sm: "block" }}
              fontSize={{ base: "xs", md: "sm" }}
              color="gray.500"
            >
              {new Date(post_date).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <Box
              fontSize="sm"
              color="gray.500"
              noOfLines={{ base: 2, md: 2 }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post_content),
              }}
            />
          </Stack>
        </Stack>
      </Link>
    </Box>
  );
};
