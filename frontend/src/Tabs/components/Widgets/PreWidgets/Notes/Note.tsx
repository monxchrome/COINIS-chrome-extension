import React from 'react';

import pageIcon from "../../../../assets/resources/page.svg";

import css from './styles/note.module.css'

const Note = ({pages}: any) => {
    const { pageName } = pages;

    return (
        <div>
            <div
                className={css.TableCell}
                // onClick={() => handleEditPageClick(key)}
            >
                <img
                    src={pageIcon}
                    alt=""
                    className={css.Icon}
                />
                    <p className={css.Desc}>
                        {
                            pageName
                        }
                    </p>
            </div>
        </div>
    );
};

export default Note;