import './App.css';
import { Grid, Card, CardMedia } from '@mui/material';

interface listItem {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}
interface listProp {
  items: listItem[];
  handleClick: (id: number) => void;
}

const ListItemComp = (props: listProp): JSX.Element => {
  const { items, handleClick } = props;

  return (
    <section>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 6, md: 4 }}>
        {items.map((i) => {
          const { id, name, image } = i;
          return (
            <Grid item xs={6} sm={3} md={3} key={id}>
              <Card className="card" onClick={() => handleClick(id)}>
                <CardMedia
                  component="img"
                  height="280"
                  image={image ? i.image.medium : ''}
                  alt={`image for ${i.name}`}
                />
                <h4 className="card-header">{name}</h4>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default ListItemComp;
