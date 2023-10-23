"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [bottleNumber, setBottleNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [data, setData] = useState([]);


  useEffect(() => {
    // Make an Axios request to fetch the bottle number
    async function fetchData() {
      axios.get('https://eyepi.vercel.app/api/get_count')
        .then(response => {
          // Assuming your API response contains the bottle number
          setBottleNumber(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }

    async function fetchtable() {
      // Fetch data from the backend API using Axios
      axios.get('https://eyepi.vercel.app/api/get_all')
        .then(response => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }
    fetchData();
    fetchtable()
  }, []);


  return (
    <main className="bg-background h-screen">
      <div>
        <img src="/bottleye_logo.svg" className="w-48 h-48 m-auto text-center" />
        <div className="text-center text-white text-3xl">
          วันนี้คุณรักโลกไปแล้ว {bottleNumber} ขวด
        </div>
      </div>
      <div className="container mx-auto mt-8 text-white font-bold text-center">

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border-2 border-white">
            <thead>
              <tr>
                <th className="border border-white p-2">Bottle Number</th>
                <th className="border border-white p-2">Date</th>
                <th className="border border-white p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-white p-2">{item.bottle_number}</td>
                  <td className="border border-white p-2">{item.date}</td>
                  <td className="border border-white p-2">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default Home;
