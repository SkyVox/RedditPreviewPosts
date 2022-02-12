import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapped,
  CenteredDiv
} from '../../global_style';
import {
  StyledBox,
  Form,
  Label,
  Input,
  PopularTopicBox
} from './style';
import { get } from '../../services/api';

export const Main = () => {
  return (
    <Wrapped>
      <SearchBox />
      <MostPopularTopics />
    </Wrapped>
  );
}

const SearchBox = () => {
  const [ topic, setTopic ] = useState<string>("");
  const navigate = useNavigate();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Build our URL.
    const url: string = topic.startsWith('/') ? topic.slice(1) : topic;
    navigate(`/r/${url}`);
  }

  return (
    <CenteredDiv>
      <StyledBox>
        <Form onSubmit={handleFormSubmit}>
          <Label htmlFor="search-topic">Search specific topic:</Label>
          <Input type="text" id="search-topic" name="search-topic" placeholder={"Search"} required={true} value={topic} onChange={event => setTopic(event.target.value)} />
          <Input type="submit" value="Submit" />
        </Form>
      </StyledBox>
    </CenteredDiv>
  );
}

const MostPopularTopics = () => {
  const [ popularTopics, setPopularTopics ] = useState<any[] | undefined>(undefined);

  const loadTopics = async () => {
    const value: any[] = await get('popular');
    setPopularTopics(value.map(element => ({
      id: element.data.id,
      url: element.data.url,
      display_name: element.data.display_name
    })));
  }

  useEffect(() => {
    loadTopics();
  }, []);

  return (
    <CenteredDiv>
      <StyledBox>
        <h3>Check below #5 most popular topics</h3>
        {
          popularTopics ?
          popularTopics.map(element => <ShowTopic key={element.id} element={element} />) :
          "Loading Topics..."
        }
      </StyledBox>
    </CenteredDiv>
  );
}

const ShowTopic = (props: any) => {
  const { url, display_name } = props.element;
  const navigate = useNavigate();

  const handleDivClick = () => {
    navigate(`${url}`);
  }

  return (
    <PopularTopicBox onClick={handleDivClick}>
      <span>Name: {display_name}</span>
    </PopularTopicBox>
  );
}