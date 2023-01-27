import React, { useState } from "react";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";

import { GrAdd } from "react-icons/gr";

import CreateCommunityModal from "@/modals/CreateCommunity/CreateCommunityModal";

type Props = {};

const Communities = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={()=>setOpen(false)}/>
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Crear comunidad
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
