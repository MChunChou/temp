import React, { useEffect, useRef, useState } from 'react';
import './style.css';

export default (props) => {
  const [ascSort, setAscSort] = useState('inactive');
  const [descSort, setDescSort] = useState('inactive');
  const [noSort, setNoSort] = useState('inactive');
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'active'
        : 'inactive'
    );
  };

  const onSortRequested = (order, event) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
  }, []);

  let menu = null;

  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="filter"
        onClick={() => onMenuClicked()}
      >
        <i className={`fa fa-filter`}></i>
      </div>
    );
  }

  let sort = null;

  if (props.enableSorting) {
    sort = (
      <div className='sort'>

        <div
          onClick={(event) => onSortRequested(ascSort === 'active' ? 'desc' : 'asc', event)}
          // onTouchEnd={(event) => onSortRequested('asc', event)}
          className={`customSortDownLabel ${ascSort}`}
        >
          <i className="fa fa-sort-amount-asc"></i>
        </div>
        <div
          onClick={(event) => onSortRequested(ascSort === 'active' ? 'desc' : 'asc', event)}
          // onTouchEnd={(event) => onSortRequested('desc', event)}
          className={`customSortUpLabel ${descSort}`}
        >
          <i className="fa fa-sort-amount-desc"></i>
        </div>

        <div
          onClick={(event) => onSortRequested('', event)}
          onTouchEnd={(event) => onSortRequested('', event)}
          className={`customSortRemoveLabel ${noSort}`}
        >
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  }

  let control = null

  if (props.controlComponent) {
    control = props.controlComponent
  }

  return (
    <div className="headerTitleCell">

      <div className="headerLabel l">
        <div className="customHeaderLabel">{props.displayName}</div>
        {sort}
      </div>
      <div className="headerLabel r">{menu}{control}</div>

    </div>
  );
};