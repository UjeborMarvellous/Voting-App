import React, { useState } from 'react';
import _ from 'lodash'
import { Button, Card, Divider, Image, Placeholder, Header, Icon, Modal } from 'semantic-ui-react'
import axios from "axios";



const Voting = () => {
  const cards = [
    {
      id: 1,
      avatar: '/Img/1.jpg',
      date: 'Joined in 1982',
      header: 'Mark',
      description: 'Primary Election',
    },
    {
      id: 2,
      avatar: '/Img/2.jpg',
      date: 'Joined in 1891',
      header: 'Grace',
      description: 'Primary Election',
    },
  ]
  const [loading, setLoading] = useState(false)
  const [voteForA, setVoteForA] = useState(0);
  const [voteForB, setVoteForB] = useState(0);
  const [voted, setVoted] = useState(false);
  const [open, setOpen] = useState(false)

  const submitVote =() => {
    axios
    .post("https://62b0304db0a980a2ef4cb189.mockapi.io/vote", {
      party1: voteForA,
      party2: voteForB,
    })
    .then(
      (response) => {
        console.log(response);
    },
    (error) => {
      console.log(error);
    })
  }

  const handleLoadingClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }
  return (
    <>
      <Button className='bg-blue-400 font-semibold text-white px-16 rounded-2xl py-2' loading={loading} onClick={handleLoadingClick} primary>
        Refresh Loading...
      </Button>
      <Divider />
      <p className='text-center mt-52 fixed ml'>{voteForA}-{voteForB}</p>
      <Card.Group className='mt-32 grids grid-cols-2 mx-52 gap-4' doubling itemsPerRow={3} stackable>
        {_.map(cards, (card) => (
          <Card key={card.header} className='px-6 mx mx-12 py-3 border-2 border-gray rounded-lg'>
            {loading ? (
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            ) : (
              <Image src={card.avatar} />
            )}

            <Card.Content className='mt-8'>
              {loading ? (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line length='very short' />
                    <Placeholder.Line length='medium' />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='short' />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : (
                <>
                  <Card.Header className='font-semibold text-2xl'>{card.header}</Card.Header>
                  <Card.Meta className='font-semibold text-xl text-gray-400'>{card.date}</Card.Meta>
                  <Card.Description className='font-semibold text-2xl'>{card.description}</Card.Description>
                </>
              )}
            </Card.Content>

            <Card.Content extra className='mt-8'>
              <Button
                disabled={voted}
                onClick={() =>
                  [card.id === 1 ?
                    setVoteForA(voteForA + 1) :
                    setVoteForB(voteForB + 1),
                  setVoted(true),
                  setOpen(true),
                  ]
                }
                className='px-6 py-2 bg-blue-500 rounded-lg ml- text-white'
                primary>
                Vote
              </Button>
              <Button
                disabled={(card.id === 1 && voteForA <= 0 ? true : false) ||
                  (card.id === 2 && voteForB <= 0 ? true : false)}
                onClick={() =>
                  [card.id === 1
                    ? setVoteForA(voteForA - 1)
                    : setVoteForB(voteForB - 1),
                  setVoted(false),
                  ]}
                className='px-8 py-2 bg-gray-300 rounded-lg ml-4 text-gray-600'
              >
                Delete Vote
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        // trigger={<Button>Basic Modal</Button>}
      >
        <Header icon>
          <Icon name='archive' />
          <p> You are about to vote for this person</p>
        </Header>
        <Modal.Content>
          <p>
            Are u sure of the person selected in this Election &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Note changes cannot be made after selection is been made
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={() => [setOpen(false),submitVote()]}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default Voting;
