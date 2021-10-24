import React from 'react';

import './App.css';
import { Paper, Button, ButtonGroup } from '@mui/material';

import EpisodeTable from './EpisodeTable';

interface listItem {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}

interface popupProps {
  item: listItem | null;
  close: () => void;
  getEpisodes: (id: number) => void;
  episodes: any[];
}

const ShowComp = (props: popupProps) => {
  const { item, close, getEpisodes, episodes } = props;

  const [seasonNr, setSeasonNr] = React.useState<number>(1);
  const [seasonMax, setSeasonMax] = React.useState<number>(1);
  const [filteredEpisodes, setFilteredEpisodes] = React.useState<any[]>(episodes);

  React.useEffect(() => {
    setSeasonMax(Math.max(...episodes.map((o) => o.season), 0));
    setFilteredEpisodes(
      episodes.filter((episode) => episode.season == seasonNr)
    );
  }, [episodes]);

  React.useEffect(() => {
    getEpisodes(item ? item.id : 0);
  }, []);

  React.useEffect(() => {
    setFilteredEpisodes(
      episodes.filter((episode) => episode.season == seasonNr)
    );
  }, [seasonNr]);

  const handleClick = (type: string) => {
    if (type === '+') {
      setSeasonNr(seasonNr + 1);
    }
    if (type === '-') {
      setSeasonNr(seasonNr - 1);
    }
  };

  return (
    <Paper style={{ padding: '1em' }}>
      <div className="popup-header">
        <h3 style={{ margin: 0 }}>{item ? item.name : ''}</h3>
        <Button variant="outlined" onClick={close}>
          Close
        </Button>
      </div>

      <div className="popup-info">
        <img className="popup-img" src={item ? item.image.medium : ''} />
        <div
          dangerouslySetInnerHTML={{ __html: item ? item.summary : '' }}
        ></div>
      </div>
      <h4 className="Episodes-header">Episodes</h4>
      <div className="season-controller">
        <h4 className="season-Header">Season: {seasonNr}</h4>
        <ButtonGroup>
          <Button disabled={seasonNr === 1} onClick={() => handleClick('-')}>
            -
          </Button>
          <Button
            disabled={seasonNr === seasonMax}
            onClick={() => handleClick('+')}
          >
            +
          </Button>
        </ButtonGroup>
      </div>
      <EpisodeTable episodes={filteredEpisodes} />
    </Paper>
  );
};

export default ShowComp;
