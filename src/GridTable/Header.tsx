import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const GridHeader: React.FC<any> = (props: any) => {
  const [ascSort, setAscSort] = useState('inactive');
  const [descSort, setDescSort] = useState('inactive');
  const [noSort, setNoSort] = useState('inactive');
  const refButton = useRef(null);

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
  }, []);

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

  const onSortRequested = (order: any, event: { shiftKey: any; }) => {
    props.setSort(order, event.shiftKey);
  };

  let menu = null;

  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="header-menu-button"
        style={{
          cursor: 'pointer'
        }}
        onClick={() => onMenuClicked()}
      >
        <FontAwesomeIcon icon={faFilter} size='xs' />
      </div>
    );
  }

  let sort = null;

  if (props.enableSorting) {
    sort = (
      <div style={{ display: 'inline-block' }}>
        <div
          onClick={(event) => onSortRequested('asc', event)}
          onTouchEnd={(event) => onSortRequested('asc', event)}>
          <div
            className={`customSortDownLabel ${ascSort}`}
          >
            <i className="fa fa-long-arrow-down"></i>
          </div>
          <div
            // onClick={(event) => onSortRequested('desc', event)}
            // onTouchEnd={(event) => onSortRequested('desc', event)}
            className={`customSortUpLabel ${descSort}`}
          >
            <i className="fa fa-long-arrow-up"></i>
          </div>
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
    <div className="gird-header">
      {menu}
      <div className="header-label">{props.displayName}</div>
      {sort}
      {control}
    </div>
  )
}

export default GridHeader;