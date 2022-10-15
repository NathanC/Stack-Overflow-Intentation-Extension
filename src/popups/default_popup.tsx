import { Box, Button, Checkbox, Divider, FormControlLabel, Link, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import StorageModal from "../StorageModal";
import { IntRange } from "../TypeHelpers";

import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';

import { compatibleStorage as storage } from "../v2-v3-abstractions";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(<Popup />)

function Popup() {

    const [storageState, setStorageState] = useState<StorageModal | undefined>(undefined)

    useEffect(() => { 

        storage.sync.get().then(result => {
            setStorageState(result as StorageModal)
        })

        storage.onChanged.addListener((changes, area) => {

            if(area !== "sync") {
                // we only care about sync state. storage.sync.onChanged doesn't exist for the "browser" object
                return
            }

            const allChanges: Partial<StorageModal> = {}

            for (const [property, change] of Object.entries(changes)) {
                allChanges[property as keyof StorageModal] = (change as any).newValue
            }

            setStorageState(old => ({...old, ...allChanges}))
        })
        
        // we can't do cleanup in the normal use effect return,
        // because the window being unloaded doesn't result in cleanup apparently
        addEventListener('unload', async (event) => {
            // nothing to do currently
        });

    }, [])

    return(
        <Box sx={{m: 3, mb: 0, mt: 2, minWidth: "450px", maxWidth: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>

            <Typography variant="h5" fontWeight="bold" paragraph textAlign="center">
                Stack Overflow Indentation++
            </Typography>

            <Typography variant="h6" paragraph textAlign="center" maxWidth={420}>
                This extension adds IDE-like tabbing and shift-tabbing in Stack Overflow. When you're on Stack Overflow, it will
                activate.
            </Typography>

            <Box>

                <FormControlLabel control={<Checkbox
                    
                    checked={storageState?.functionalityDisabled || false}
                    onChange={event => {

                        const checked = event.target.checked

                        const stateUpdate: Partial<StorageModal> = {
                            functionalityDisabled: checked
                        }

                        storage.sync.set(stateUpdate)
                    }}
                
                />} label={<Typography color="error">Disable all functionality</Typography>} />

                <FormControlLabel
                    control={<Checkbox
                        checked={storageState?.textAreaBorderEnabled ?? true}
                        onChange={event => {

                                const checked = event.target.checked

                                const stateUpdate: Partial<StorageModal> = {
                                    textAreaBorderEnabled: checked
                                }

                                storage.sync.set(stateUpdate)
                            }
                        }
                    />}
                    label={<Typography>Enable TextArea Border</Typography>}
                    disabled={storageState?.functionalityDisabled}
                />

                <Typography mt={1.5}>
                    Number of spaces per tab
                </Typography>

                {storageState !== undefined && 

                    <Slider
                        disabled={storageState?.functionalityDisabled}
                        min={1}
                        max={12}
                        
                        aria-label="Number of spaces per tab slider"
                        
                        value={storageState.numberOfSpacesPerTab || 4}
                        
                        onChange={(event, newValue) => {
                            const stateUpdate: Partial<StorageModal> = {
                                numberOfSpacesPerTab: newValue as IntRange<1, 12>
                            }

                            storage.sync.set(stateUpdate)
                        }}
                        getAriaValueText={(value) => `${value} spaces`}
                        step={1}
                        valueLabelDisplay="auto"
                        marks={Array.from({length: 12}, (_, i) => i + 1).filter(i => i == 1 || i % 2 === 0)
                            .map(even => ({value: even, label: even === 4 ? <Typography fontWeight="bold">4</Typography> : <Typography>{even}</Typography>}) )  }
                    />
                }
            </Box>
            
            <Divider/>

            <Box mt={2} mb={2} display="flex" columnGap={4}>
                
                <Link style={{textDecoration: "none"}} component="a" href="https://distant.land" target="_blank" rel="noreferrer">
                    <Button startIcon={<LanguageIcon/>} variant="contained">Visit Author's Website</Button>
                </Link>
                
                <Link style={{textDecoration: "none"}} component="a" href="https://github.com/NathanC/Stack-Overflow-Intentation-Extension"  target="_blank" rel="noreferrer">
                    <Button startIcon={<GitHubIcon/>} variant="contained">View Project on GitHub</Button>
                </Link>
            </Box>
        </Box>
    )
}