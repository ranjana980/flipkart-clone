import { Modal } from "reactstrap";
import { ProductForm } from "./add-product-model";
import { productObjArray, productSchema, } from "./helper";
import CommonTable from "../../common-components/MyStyledTable/MyStyledTable";
import { productColumns } from "../../utils/constant";
import useProducts from "../../hooks/product-list";

export default function AdminProductList() {
  const { modal, updatedList, menu, handleChange, productValues, handleSubmit, setModal } = useProducts()

  return (
    <div className={`${menu ? 'w-[85%] left-[15%]' : 'w-[95%] left-[5%]'}   absolute  top-[70px] right-0 }`}>
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        backdrop={true}
        keyboard={false}
      >
        <ProductForm
          buttonText="Add"
          initialValues={productValues}
          validationSchema={productSchema}
          handleSubmit={handleSubmit}
          productArrObj={productObjArray}
          handleChange={handleChange}
        />
      </Modal>
      <div className="mx-5 mb-5 mt-[30px]"> <CommonTable columns={productColumns} data={updatedList} /></div>
    </div >
  );
};
