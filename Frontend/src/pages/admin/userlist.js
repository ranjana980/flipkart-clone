import { Modal } from "reactstrap";
import { userObjArray, userSchema, } from "./helper";
import CommonTable from "../../common-components/MyStyledTable/MyStyledTable";
import { userColumns } from "../../utils/constant";
import useUsers from "../../hooks/user-list";
import { UserForm } from "./add-user-model";

export default function AdminUserList() {
    const { modal, updatedList, menu, userValues, handleChange, handleSubmit, setModal } = useUsers()

    return (
        <div className={`${menu ? 'w-[85%] left-[15%]' : 'w-[95%] left-[5%]'}   absolute  top-[70px] right-0 }`}>
            <Modal
                isOpen={modal}
                toggle={() => setModal(false)}
                backdrop={true}
                keyboard={false}
                size="md"
                onClosed={() => setModal(false)}

            >
                <UserForm
                    buttonText={userValues?._id ? "update" : "Add"}
                    initialValues={userValues}
                    validationSchema={userSchema}
                    handleSubmit={handleSubmit}
                    userObjArray={userObjArray}
                    handleChange={handleChange}
                />
            </Modal>
            <div className="mx-5 mb-5 mt-[30px]"> <CommonTable columns={userColumns} data={updatedList} /></div>
        </div >
    );
};
