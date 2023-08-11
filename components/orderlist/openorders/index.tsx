import { fetchAsset } from '@/data/container/asset';
import { IRoot } from '@/data/store';
import useApi from '@/hooks/useApi';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import numbro from 'numbro';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGridStyle } from '..';

export default function OpenOrders() {

  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Time', minWidth: 140, flex: 0.5,
      valueGetter: (params: GridValueGetterParams) => moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
    },
    { field: 'pairName', headerName: 'Pair', flex: 0.5},
    { field: 'type', headerName: 'Type', flex: 0.5,},
    { field: 'action', headerName: 'Buy/Sell', renderCell: (params: GridValueGetterParams) => <div className={params.row.action === 'buy' ? 'text-buy' : 'text-sell'}>{params.row.action}</div> },
    { field: 'price', headerName: 'Price', minWidth: 120, flex: 0.5,
      valueGetter: (params: GridValueGetterParams) =>
      `${numbro(params.row.price).format({mantissa: 6, trimMantissa: true})} ${params.row.pair.token2}`,
    },
    { field: 'amount', headerName: 'Amount', minWidth: 120, flex: 0.5,
      valueGetter: (params: GridValueGetterParams) =>
      `${numbro(params.row.amount).format({mantissa: 6, trimMantissa: true})} ${params.row.pair.token1}`,
    },
    { field: 'filled', headerName: 'Filled', valueGetter: (params: GridValueGetterParams) => (params.row.type == "iceberg" ? params.row.icebergfilled : params.row.filled) + " " + params.row.pair.token1, flex: 0.5, },
    { field: 'unfilled', headerName: 'Unfilled', valueGetter: (params: GridValueGetterParams) => (params.row.type == "iceberg" ? params.row.icebergTotal - params.row.icebergfilled : params.row.amount - params.row.filled) + " " + params.row.pair.token1, flex: 0.5, },
    { field: 'operation', headerName: 'Cancel', 
      renderHeader: () => <div className='text-buy cursor-pointer'>Cancel All</div>, 
      sortable: false, filterable: false, hideable: false, minWidth: 130, flex: 0.5,
      renderCell: (params: GridValueGetterParams) => <div className='text-buy cursor-pointer' onClick={() => cancelOrder(params.row)}>Cancel</div>
    },
  ];

  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const openOrders = useSelector((state:IRoot) => state.api.openOrders);
  const { data: rows, loading, mutate } = useApi('/api/orders/open');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(openOrders > 0) mutate();
  }, [openOrders])

  const cancelOrder = async (row) => {
    try {
      const resp = await axios.delete(`/api/orders/cancel/${row.id}`);
      enqueueSnackbar({
        message: <div><label className='text-[16px] font-bold'>Success!</label><br/>{`Cancelled ${row.type.toUpperCase()} ${row.action.toUpperCase()} ${row.pairName}`}</div>,
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar({
        message: <div><label className='text-[16px] font-bold'>Error</label><br/>{`${error.response?.data?.message ?? error.message}`}</div>,
        variant: 'error',
      });
    } finally {
      mutate();
      dispatchThunk(fetchAsset()); 
    }
  }

  return (
    <div className='w-full h-full'>
      <DataGrid
        rows={rows || []}
        columns={columns}
        hideFooterPagination
        hideFooter
        loading={loading}
        rowSelection={false}
        sx={DataGridStyle}
      />
    </div>
  );
}
