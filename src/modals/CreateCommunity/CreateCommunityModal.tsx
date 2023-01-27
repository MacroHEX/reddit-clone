import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";

import { doc, getDoc, serverTimestamp, setDoc } from "@firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal = ({ open, handleClose }: Props) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);
    // Recalcular carácteres restantes
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // Validar la comunidad
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "El nombre de las comunidades deben tener entre 3-21 caracteres y solo pueden contener letras, números sin espacios"
      );
      return;
    }

    setLoading(true);

    try {
      // Crear la comunidad en firebase
      // Validar si el nombre esta disponible
      // Si es valido crear comunidad
      const communityDocRef = doc(firestore, "community", communityName);
      const communityDoc = await getDoc(communityDocRef);

      if (communityDoc.exists()) {
        throw new Error(`r/${communityName} ya está tomado. Intenta con otro.`);
        return;
      }

      // Crear la comunidad
      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
            fontWeight={700}
            color="#121212"
          >
            Crear una comunidad
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15} color="#121212">
                Nombre
              </Text>
              <Text fontSize={11} color="gray.500">
                Los nombres de la comunidades incluyendo la capitalización no
                pueden ser cambios
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red" : "gray.500"}
              >
                {charsRemaining} Carácteres restantes
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15} color="#121212">
                  Tipo de Comunidad
                </Text>
                {/* checkbox */}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Público
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Cualquiera puede ver, publicar y comentar en esta
                        comunidad
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restringido
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Cualquiera puede ver esta comunidad, pero solo usuarios
                        aprobados pueden publicar
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Privado
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Solo usuarios aprobados pueden ver y publicar en esta
                        comunidad
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Crear Comunidad
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
