import React, { useEffect, useState } from 'react';
import Short from './Short';

const Shorts = () => {
    const [shortPages, setShortPages] = useState<any[]>([]);
    
    useEffect(() => {
        chrome.storage.sync.get(null, items => {
            const shortContents: { key: string; value: string }[] = Object.entries(
              items
            )
              .filter(([key]) => key.startsWith("shortContent_"))
              .map(([key, value]) => {
                const modifiedValue = (value as string).replace(/<p>|<\/p>/g, "");
                console.log(
                  `Key: ${key}, Original Value: ${value}, Modified Value: ${modifiedValue}`
                );
                return { key, value: modifiedValue };
              });
            setShortPages(shortContents);
          });
    }, [])

    return (
        <div>
            {shortPages.map(short => <Short key={short.id} shorts={short} />)}
        </div>
    );
};

export default Shorts;