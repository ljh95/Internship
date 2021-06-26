import React from 'react';
import Button from '../Atomics/Button';
import FormHeader from '../Molecules/FormHeader';

export default function ModalConfirm({
  execute,
  rollback,
  headerContent,
  btnContent,
  cn,
}) {
  return (
    <div className="d-flex justify-content-center">
      <div className="createForm">
        <FormHeader header={headerContent} closeModalHandler={rollback} />

        <div className="d-flex justify-content-center _login-btn">
          <Button content={btnContent} cn={cn} onClickHandler={execute} />
        </div>
      </div>
    </div>
  );
}
