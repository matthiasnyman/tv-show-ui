import './App.css';
import * as React from 'react';
import ListItemComp from './ListItemComp';
import Navbar from './Navbar';
import ShowComp from './ShowComp';
import { Dialog } from '@mui/material';

interface listItem {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}

const Url = 'https://api.tvmaze.com'

const App = () => {

  const [searchText, setSearchText] = React.useState<string>('');
  const [fetchResult, setFetchResult] = React.useState<any[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<listItem | null>(null);
  const [episodes, setEpisodes] = React.useState<any[]>([]);


  const handleClick = (id: number) => {
    fetch(`${Url}/shows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedItem(data);
      });
  };
  const onClose = () => {
    setSelectedItem(null);
  };

  const handleChange = (e: any): void => {
    setSearchText(e.target.value);
  };

  const getList = () => {
    fetch(`${Url}/shows`)
      .then((res) => res.json())
      .then((data) => {
        const simplifiedData = data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            image: item.image,
          };
        });
        setFetchResult(simplifiedData);
      });
  }

  React.useEffect(() => {
    if (searchText) {
      //Delay on search 
      const delayDebounceFn = setTimeout(() => {
        fetch(`${Url}/search/shows?q=${searchText}`)
          .then((res) => res.json())
          .then((data) => {
            const simplifiedData = data.map((item: any) => {
              return {
                id: item.show.id,
                name: item.show.name,
                image: item.show.image,
              };
            });
            setFetchResult(simplifiedData);
          });
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }else {
      getList();
    }
  }, [searchText]);

  const getEpisodes = (id: number): void => {
    fetch(`${Url}/shows/${id}/episodes`)
    .then((res) => res.json())
    .then((data) => {
      setEpisodes(data);
    });
  }

  return (
    <div>
      <Navbar searchText={searchText} handleChange={handleChange} />
      <section className="list">
        <ListItemComp items={fetchResult} handleClick={handleClick} />
        <Dialog open={!!selectedItem} onClose={onClose} maxWidth="lg">
          <ShowComp item={selectedItem} close={onClose} getEpisodes={getEpisodes} episodes={episodes} />
        </Dialog>
      </section>
    </div>
  );
};

export default App;
