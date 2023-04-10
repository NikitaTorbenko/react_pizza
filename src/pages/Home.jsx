import React from "react";
import qs from "qs";

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue, categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const { items } = useSelector((state) => state.pizzaSlice);

  // const [pizzas, setPizzas] = React.useState([]);

  const pizzasPerPage = 44;
  // const [currentPage, setCurrentPage] = React.useState(1);

  const lastPizzaIndex = currentPage * pizzasPerPage;
  const firstPizzaIndex = lastPizzaIndex - pizzasPerPage;
  const currentPizza = items.slice(firstPizzaIndex, lastPizzaIndex);

  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    dispatch(setCurrentPage(currentPage - 1));
  };

  const nextPage = () => {
    if (currentPage === Math.ceil(items.length / pizzasPerPage)) {
      return;
    }
    dispatch(setCurrentPage(currentPage + 1));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sort?.sortProperty
      );
  
      dispatch(
        setFilters({
          ...params,
          sort,
          currentPage: 1,
        })
      );
      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
      })
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    isSearch.current = false;
  }, [categoryId, sort.sortProperty]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sort,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  if (!items.length) {
    return (
      <div className="content__error-info">
        <h2>Произошла ошибка 😕</h2>
        <p>К сожалению, не удалось получить пиццы</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.length
          ? currentPizza
              .filter((pizzaItem) =>
                pizzaItem.title
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .map((pizzaItem) => (
                <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
              ))
          : [...Array(8)].map((el, index) => <Skeleton key={index} />)}
      </div>
      <Pagination
        paginate={paginate}
        totalPizzas={items.length}
        pizzasPerPage={pizzasPerPage}
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
