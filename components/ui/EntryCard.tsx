import React, { DragEvent, FC, useContext } from 'react'
import { useRouter } from 'next/router';
import { capitalize, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui';

import { dateFunction } from '../../utils'

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging } = useContext(UIContext);
    const router = useRouter();

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', entry._id);
        startDragging();
    }

    const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
        endDragging();
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`);
    }

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onClick}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">{capitalize(dateFunction.getFormatDistanceToNow(entry.createAt))}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
