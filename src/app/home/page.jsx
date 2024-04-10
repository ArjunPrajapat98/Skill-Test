"use client";
import React, { useEffect, useState } from 'react'
import { utils } from '@/helper';
import { getProductsList } from '@/services/commonService';
import { useRouter } from "next/navigation";
import Pagination from "react-js-pagination";

const obj = {
  limit: 10,
  skip: 0,
  page: 1,
}

export default function Page() {

  const router = useRouter();
  const [filter, setFilter] = useState(obj);
  const [productsData, setProductsData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const getCountryData = async (data) => {
    const response = await getProductsList(data);
    setProductsData(response?.products);
    setTotalCount(response?.total);
  }

  useEffect(() => {
    getCountryData(filter);
  }, [filter])

  const handlePageChange = (pageNumber) => {
    setFilter((state) => ({
      ...state,
      skip: (filter?.limit * (pageNumber - 1)),
      page: pageNumber,
    }))
  }

  return (
    <>
      {
        productsData?.length > 0 ? (
          <div className='container'>
            <div className='row'>
              <div className='_cutom_style mt-5 mb-5'>
                {
                  productsData?.length > 0 && productsData?.map((el, ind) => {
                    return (
                      <div key={ind + 'abc'}>
                        <div class="card cutomCard_style" style={{ "width": '18rem' }}>
                          <div className='img_cls'>
                            <img src={el?.thumbnail} class="card-img-top" alt="..." />
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">{el?.title}</h5>
                            <p class="card-text">{utils?.spliceString(el.description, 0, 40)}{" "}</p>
                            <strong> Price : {el?.price} </strong> <br />
                            <button onClick={() => router.push(`/home/${el?.id}`)} class="btn btn-primary mt-2">View</button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='row p-2'>
              {
                productsData?.length > 0 && (
                  <div className='pagi_ctms'>
                    <Pagination
                      activePage={filter?.page}
                      itemsCountPerPage={10}
                      totalItemsCount={totalCount}
                      onChange={handlePageChange}
                    />
                  </div>
                )
              }
            </div>
          </div>
        ) : (
          <div className='container mt-5'>Loading...</div>
        )
      }
    </>
  )
}
