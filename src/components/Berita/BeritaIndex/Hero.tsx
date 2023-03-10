import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import dateToIndonesiaFormat from "~/src/utils/date";
import getImage from "~/src/utils/getImage";

interface Props {
  title: string;
  image: string | null;
  date: Date;
  slug: string;
}

const dummyHeroImage =
  "https://images.unsplash.com/photo-1664889167950-50b456b0e61c";

export const Hero: React.FC<Props> = ({ title, image, date, slug }) => {
  const imageGradient = `
     linear-gradient(
        180deg,
        rgba(32, 17, 0, 0.34) 0%,
        rgba(32, 17, 0, 0.88) 100%
        )
        `;

  return (
    <Box h={{ base: "lg", md: "xl" }} position="relative">
      <Box
        bg={`${imageGradient}`}
        zIndex="1"
        h="full"
        w="full"
        position="absolute"
      />

      <Image
        src={image ? getImage(image) : dummyHeroImage}
        fill
        alt="Hero image"
        style={{
          objectFit: "cover",
          position: "absolute",
        }}
        quality={50}
        priority
      />
      <Container maxW="container.xl" h="full" zIndex="2" position="relative">
        <Stack h="full" pt="28" pb="10" spacing="2">
          <Breadcrumb>
            <BreadcrumbItem color="white">
              <BreadcrumbLink href="/" color="primary.500">
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem color="white">
              <BreadcrumbLink href="#">Berita</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Spacer />

          <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} color="white">
            <Balancer>{title}</Balancer>
          </Heading>

          <Text
            color="whiteAlpha.700"
            pb="7"
            fontSize={{ base: "sm", md: "md" }}
          >
            {dateToIndonesiaFormat(date)}
          </Text>

          <Link href={`/berita/${slug}`}>
            <Button
              variant="outline"
              maxW="fit-content"
              _hover={{ bg: "whiteAlpha.200" }}
              _active={{ bg: "whiteAlpha.300" }}
            >
              <Text fontSize={{ base: "sm", md: "md" }} color="white">
                Baca Selengkapnya
              </Text>
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
