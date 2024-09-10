import { useEffect, useState } from "react";
import closeIcon from "./assets/close-icon.png";
import Table from "./components/table";
import SearchBar from "./components/search-bar";
import Option from "./components/option";
import Modal from "./components/modal";
import { fetchUsers } from "./services/fetch-users";
import { userDataBuilder } from "./services/user-builder";
import { COLUMNS, COLUMNS_WITHOUT_ID } from "./constants/conts";
import { User } from "./models/users.model";
import {
  SearchInitState,
  UserDataState,
  UserInputData,
} from "./models/states.model";
import { useAppDispatch, useAppSelector } from "./hooks/use-redux";
import { PromiseState } from "./enums/enums";
function App() {
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector((state) => state.users.status);
  useEffect(() => {
    if (usersStatus === PromiseState.idle) {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  const [data, setData] = useState<Array<UserDataState>>([]);
  const [filteredData, setFilteredData] = useState<Array<UserDataState>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(-1);
  const [addUser, setAddUser] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [search, setSearch] = useState<SearchInitState>({
    value: "",
    isSearchingStarted: false,
  });
  const [inputData, setInputData] = useState<UserInputData>({
    username: "",
    name: "",
    email: "",
    phone: "",
  });

  const buttonsInitState = COLUMNS.map((item) => ({
    isSelected: false,
    type: item,
  }));

  const [selectedButton, setSelectedButton] = useState(buttonsInitState);

  const isAnyButtonsSelected = !selectedButton.every(
    (item) => !item.isSelected
  );

  useEffect(function () {
    async function fetchUsers() {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!res.ok) {
        setError(true);
      }

      const usersData = await res.json();

      const data = usersData.map((item: User.General) => userDataBuilder(item));

      setData(data);

      setLoading(false);
    }
    fetchUsers();
  }, []);

  const handleChange =
    (item: keyof UserInputData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputData((prevData) => ({
        ...prevData,
        [item]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmpty = Object.values(inputData).every(
      (value) => value.trim() === ""
    );

    if (isEmpty) {
      return;
    }
    const newUser = inputData;
    const lastUser = data[data.length - 1];
    setData((prev) => [...prev, { ...newUser, id: lastUser.id + 1 }]);
  };

  const handleUserDelete = () => {
    const dataAfterDeleteUser = data.filter(
      (item) => item.id !== userIdToDelete
    );
    setData(dataAfterDeleteUser);
    setModalAlert(false);
  };

  return (
    <>
      <header>
        <h1>User Management Table </h1>
        <span>
          All users: <b>{data.length}</b>
        </span>
      </header>

      <section className="options-bar">
        <SearchBar
          search={search}
          setSearch={setSearch}
          selectedButton={selectedButton}
          data={data}
          setFilteredData={setFilteredData}
          isAnyButtonsSelected={isAnyButtonsSelected}
        ></SearchBar>

        <div className="options">
          {selectedButton.map((item, index) => (
            <Option
              key={item.type}
              selected={item.isSelected}
              columnName={item.type}
              onClick={() =>
                setSelectedButton((prevState) =>
                  prevState.map((button, buttonIndex) =>
                    buttonIndex === index
                      ? { ...button, isSelected: !button.isSelected }
                      : button
                  )
                )
              }
            ></Option>
          ))}
        </div>
      </section>

      <section className="table-wrapper">
        <Table
          // data={users} //TODO: add redux as main state store
          data={data}
          loading={loading}
          error={error}
          selectedButton={selectedButton}
          isAnyButtonsSelected={isAnyButtonsSelected}
          setModalAlert={setModalAlert}
          filteredData={filteredData}
          searchResults={search}
          setUserIdToDelete={setUserIdToDelete}
        ></Table>
      </section>

      <section className="new-user" style={{ paddingInline: "4px" }}>
        {addUser ? (
          <img
            src={closeIcon}
            className="icon-hover"
            onClick={() => setAddUser(false)}
          ></img>
        ) : (
          <button className="option-button" onClick={() => setAddUser(true)}>
            Add new user
          </button>
        )}
        <span>
          <b>{!filteredData.length ? data.length : filteredData.length}</b>{" "}
          users found
        </span>
      </section>

      {addUser && (
        <form className="new-user" onSubmit={handleSubmit}>
          <button
            className="option-button-selected"
            style={{ height: "4rem" }}
            type="submit"
            accessKey="enter"
          >
            Add user
          </button>

          {COLUMNS_WITHOUT_ID.map((item) => (
            <input
              className="option-button add-user"
              key={item}
              type="text"
              placeholder={`${item}...`}
              value={inputData[item] || ""}
              onChange={handleChange(item)}
            />
          ))}
        </form>
      )}

      {modalAlert && (
        <Modal
          handleUserDelete={handleUserDelete}
          setModalAlert={setModalAlert}
        />
      )}
    </>
  );
}

export default App;
