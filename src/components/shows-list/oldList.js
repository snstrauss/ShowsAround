<ScrollView ref={view => this.view = view} >
                        {theArray.map((show, idx) => {

                            let thisArtist = this.state.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                            
                            return (
                                <View key={`${show.artist} - ${show.date} - ${idx}`}>
                                    {/* 
                                        this will render before the first item, and will 
                                        serve as buffer before header    
                                    */}
                                    {/*<ShowIf condition={idx === 0}>
                                        <View style={{borderTopWidth: 2, borderColor: Color.getRandom()}}></View>
                                    </ShowIf>*/}
                                    
                                    {/* 
                                        this is the actual item
                                    */}
                                    <Show key={show.artist + idx} 
                                          idx={idx} 
                                          isLast={idx === theArray.length - 1} 
                                          show={show} 
                                          artist={thisArtist} 
                                          parent={this} />

                                    {/* 
                                        this will render after the last item, and will be used 
                                        as a buffer for the ScrollView glitch
                                        (the actual last item will be fully visible)    
                                    */}
                                    <ShowIf condition={idx === theArray.length - 1}>
                                        <EndItem></EndItem>
                                    </ShowIf>

                                </View>
                            )
                        })}
                    </ScrollView>