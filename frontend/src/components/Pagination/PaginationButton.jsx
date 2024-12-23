import { Pagination } from "@mantine/core";
import React from "react";

const PaginationButton = ({ total, activePage, onChange }) => {
  return (
    <Pagination
      total={total}
      color="rgba(255, 196, 196, 1)"
      size="sm"
      radius="md"
      value={activePage} // Geçerli sayfa numarasını ayarla
      onChange={onChange} // Sayfa değişim fonksiyonu
    />
  );
};

export default PaginationButton;
