import React from 'react';
import { Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import { useTranslation } from '@/base/config/i18next';
import { LIST_PER_PAGE } from '@/base/constants/common';

interface IProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
  onPerPageChange: (arg: string) => void;
  disabled?: boolean;
  currentPerPage: string;
}

const PaginationPerPage: React.FC<IProps> = ({
  pageCount,
  currentPage,
  onPageChange,
  onPerPageChange,
  disabled = false,
  currentPerPage,
}) => {
  const { t } = useTranslation('common');
  return (
    <div className="pagination-container d-flex flex-wrap justify-content-between">
      <div className="per-page d-flex align-items-center">
        <span className="text me-2">{t('perPageShow')}</span>
        <Form.Group className="perpage ml-2 mr-4">
          <Form.Select onChange={(e) => onPerPageChange(e.target.value)} value={currentPerPage}>
            {LIST_PER_PAGE.map((ele) => (
              <option key={ele.toString()} value={ele.toString()}>
                {ele}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <p className="description d-flex">
          <span className="text ms-4">{t('perPageMessage1')}</span>
          <span className="text font-weight-bold mx-1">1</span>
          <span className="text">{t('perPageMessage2')}</span>
          <span className="text font-weight-bold mx-1">10</span>
          <span className="text">{t('perPageMessage3')}</span>
          <span className="text font-weight-bold ms-1">100</span>
        </p>
      </div>
      <ReactPaginate
        forcePage={currentPage - 1}
        pageCount={pageCount}
        previousLabel={<span className="icon-pagination iconimgs-chevron-left" />}
        nextLabel={<span className="icon-pagination iconimgs-chevron-right" />}
        breakLabel={'...'}
        breakClassName={'page-item'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={'mb-0 pagination'}
        pageClassName={`page-item ${disabled && 'disabled'}`}
        pageLinkClassName="page-link"
        activeClassName={'active'}
        onPageChange={onPageChange}
        previousClassName={`page-item ${disabled && 'disabled'}`}
        previousLinkClassName="page-link"
        nextClassName={`page-item ${disabled && 'disabled'}`}
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
      />
    </div>
  );
};

export default PaginationPerPage;
